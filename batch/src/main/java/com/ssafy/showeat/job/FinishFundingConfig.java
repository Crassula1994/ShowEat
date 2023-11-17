package com.ssafy.showeat.job;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManagerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaCursorItemReader;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaCursorItemReaderBuilder;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.support.IteratorItemReader;
import org.springframework.batch.item.support.SynchronizedItemStreamReader;
import org.springframework.batch.item.support.builder.SynchronizedItemStreamReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.data.util.Pair;

import com.ssafy.showeat.domain.Coupon;
import com.ssafy.showeat.domain.CouponStatus;
import com.ssafy.showeat.domain.Funding;
import com.ssafy.showeat.domain.FundingIsActive;
import com.ssafy.showeat.domain.Notification;
import com.ssafy.showeat.domain.NotificationType;
import com.ssafy.showeat.domain.User;
import com.ssafy.showeat.domain.UserFunding;
import com.ssafy.showeat.listner.JobListener;
import com.ssafy.showeat.repository.CouponRepository;
import com.ssafy.showeat.repository.FundingRepository;
import com.ssafy.showeat.service.QrService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableBatchProcessing
public class FinishFundingConfig {

	private final int CHUNK_SIZE = 100;
	private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

	private final FundingRepository fundingRepository;
	private final CouponRepository couponRepository;
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final EntityManagerFactory entityManagerFactory;
	private final QrService qrService;
	private final SendMmsNotificationItemWriter sendMmsNotificationItemWriter;

	/**
	 * 펀딩 마감
	 * 성공 -> 쿠폰 생성 -> 큐알 생성 -> 알림 생성 -> 알림 보내기
	 * 실패 -> 알림 생성 -> 알림 보내기
	 */
	@Bean
	public Job finishFundingJob() {
		return jobBuilderFactory.get("finishFundingJob")
			.incrementer(new RunIdIncrementer())
			.listener(new JobListener())
			.start(finishFundingStep())
			.next(createCouponQrStep())
			.next(addCreateCouponNotificationStep())
			.next(sendCreateCouponNotificationStep())
			.build();
	}

	/**
	 * 펀딩 종료
	 */
	@Bean
	@JobScope
	public Step finishFundingStep() {
		return stepBuilderFactory.get("finishFundingStep")
			.<Funding, Pair<Funding, List<Coupon>>>chunk(CHUNK_SIZE)
			.reader(fundingReader())
			.processor(fundingProcessor())
			.writer(fundingWriter())
			.build();
	}

	@Bean
	@StepScope
	public ItemReader<Funding> fundingReader() {
		// log.info("Reader 실행");
		List<Funding> fundingList = fundingRepository.findByFundingIsActiveAndFundingEndDate(FundingIsActive.ACTIVE,
			LocalDate.now());
		return new IteratorItemReader<>(fundingList);
	}

	@Bean
	@StepScope
	public ItemProcessor<Funding, Pair<Funding, List<Coupon>>> fundingProcessor() {
		return funding -> {
			// log.info("Processor 실행");
			List<Coupon> couponList = new ArrayList<>();

			if (funding.getFundingCurCount() < funding.getFundingMinLimit()) {
				// 실패
				// log.info("{} 실패" , funding.getFundingTitle());
				funding.changeFundingStatusByFail();
			} else {
				// 성공
				// log.info("{} 성공" , funding.getFundingTitle());
				funding.changeFundingStatusBySuccess();

				for (UserFunding userFunding : funding.getUserFundings()) {
					// 쿠폰 발급
					User user = userFunding.getUser();
					Coupon coupon = Coupon.createCouponByFundingSuccess(user, funding);
					couponList.add(coupon);
				}
			}
			return Pair.of(funding, couponList);
		};
	}

	@Bean
	@StepScope
	public ItemWriter<Pair<Funding, List<Coupon>>> fundingWriter() {
		return items -> {
			//log.info("Writer 실행");
			List<Funding> fundingList = new ArrayList<>();
			List<Coupon> couponList = new ArrayList<>();

			for (Pair<Funding, List<Coupon>> item : items) {
				fundingList.add(item.getFirst());

				if (item.getSecond().isEmpty())
					continue;
				item.getSecond().stream().forEach(coupon -> couponList.add(coupon));
			}

			if (!fundingList.isEmpty())
				fundingRepository.saveAll(fundingList);

			if (!couponList.isEmpty())
				couponRepository.saveAll(couponList);
		};
	}

	/**
	 * qr 생성
	 */
	@Bean
	public Step createCouponQrStep() {
		return this.stepBuilderFactory.get("createCouponQrStep")
			.<Coupon, Coupon>chunk(CHUNK_SIZE)
			.reader(createCouponQrItemReader())
			.processor(createCouponQrItemProcessor())
			.writer(createCouponQrItemWriter())
			.taskExecutor(new SimpleAsyncTaskExecutor()) // 가장 간단한 멀티쓰레드 TaskExecutor를 선언하였습니다.
			.build();
	}

	@Bean
	public JpaPagingItemReader<Coupon> createCouponQrItemReader() {
		return new JpaPagingItemReaderBuilder<Coupon>()
			.name("addExpireCouponNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// pageSize: 한 번에 조회할 row 수
			.pageSize(CHUNK_SIZE)
			// couponStatus가 NONE인 쿠폰이 대상이 됩니다.
			.queryString("select c from Coupon c where c.couponStatus = :couponStatus ")
			.parameterValues(Map.of("couponStatus", CouponStatus.NONE))
			.build();
	}

	@Bean
	public ItemProcessor<Coupon, Coupon> createCouponQrItemProcessor() {
		log.info("createCouponQrItemProcessor 실행");
		return coupon -> qrService.qrToCoupon(coupon);
	}

	@Bean
	public JpaItemWriter<Coupon> createCouponQrItemWriter() {
		return new JpaItemWriterBuilder<Coupon>()
			.entityManagerFactory(entityManagerFactory)
			.build();
	}

	/**
	 * 알림 생성
 	 */
	@Bean
	public Step addCreateCouponNotificationStep() {
		return this.stepBuilderFactory.get("addCreateCouponNotificationStep")
			.<Coupon, Notification>chunk(CHUNK_SIZE)
			.reader(addCreateCouponNotificationItemReader())
			.processor(addCreateCouponNotificationItemProcessor())
			.writer(addCreateCouponNotificationItemWriter())
			.build();
	}

	@Bean
	public JpaPagingItemReader<Coupon> addCreateCouponNotificationItemReader() {
		return new JpaPagingItemReaderBuilder<Coupon>()
			.name("addCreateCouponNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// pageSize: 한 번에 조회할 row 수
			.pageSize(CHUNK_SIZE)
			// CouponStatus가 CREATE인 쿠폰이 알람 대상이 됩니다.
			.queryString("select c from Coupon c " +
				"join fetch c.funding f " +
				"join fetch c.user u " +
				"where c.couponStatus = :couponStatus ")
			.parameterValues(Map.of("couponStatus", CouponStatus.CREATE))
			.build();
	}

	@Bean
	public ItemProcessor<Coupon, Notification> addCreateCouponNotificationItemProcessor() {
		log.info("addCreateCouponNotificationItemProcessor 실행");
		return coupon -> {
			String message = coupon.getFunding().getFundingTitle() + NotificationType.COUPON_CREATE.getMessage()
				+ dateFormat.format(coupon.getCouponExpirationDate());
			return Notification.createMms(coupon.getUser(), coupon.getFunding(), message,
				NotificationType.COUPON_CREATE, coupon
			);
		};
	}

	@Bean
	public JpaItemWriter<Notification> addCreateCouponNotificationItemWriter() {
		return new JpaItemWriterBuilder<Notification>()
			.entityManagerFactory(entityManagerFactory)
			.build();
	}

	/**
	 * 알림 보내기
	 */
	@Bean
	public Step sendCreateCouponNotificationStep() {
		log.info("sendCreateCouponNotificationStep 실행");
		return this.stepBuilderFactory.get("sendCreateCouponNotificationStep")
			.<Notification, Notification>chunk(CHUNK_SIZE)
			.reader(sendCreateCouponNotificationItemReader())
			.writer(sendMmsNotificationItemWriter)
			.taskExecutor(new SimpleAsyncTaskExecutor()) // 가장 간단한 멀티쓰레드 TaskExecutor를 선언하였습니다.
			.build();
	}

	@Bean
	public SynchronizedItemStreamReader<Notification> sendCreateCouponNotificationItemReader() {
		log.info("sendCreateCouponNotificationItemReader 실행");
		JpaCursorItemReader<Notification> itemReader = new JpaCursorItemReaderBuilder<Notification>()
			.name("sendCreateCouponNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// 발송 여부(notificationSent)가 미발송인 알람이 조회 대상이 됩니다.
			.queryString("select n from Notification n "
				+ "join fetch n.funding f "
				+ "join fetch n.user u "
				+ "join fetch n.coupon c "
				+ "where n.notificationType = :notificationType "
				+ "and n.notificationSent = :notificationSent")
			.parameterValues(Map.of("notificationType", NotificationType.COUPON_CREATE, "notificationSent", false))
			.build();

		return new SynchronizedItemStreamReaderBuilder<Notification>()
			.delegate(itemReader)
			.build();
	}

}
