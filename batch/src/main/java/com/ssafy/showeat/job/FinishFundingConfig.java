package com.ssafy.showeat.job;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
import org.springframework.batch.item.support.IteratorItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.util.Pair;

import com.ssafy.showeat.domain.Coupon;
import com.ssafy.showeat.domain.Funding;
import com.ssafy.showeat.domain.FundingIsActive;
import com.ssafy.showeat.domain.Notification;
import com.ssafy.showeat.domain.NotificationType;
import com.ssafy.showeat.domain.User;
import com.ssafy.showeat.domain.UserFunding;
import com.ssafy.showeat.listner.JobListener;
import com.ssafy.showeat.repository.CouponRepository;
import com.ssafy.showeat.repository.FundingRepository;
import com.ssafy.showeat.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableBatchProcessing
public class FinishFundingConfig {

	private final FundingRepository fundingRepository;
	private final CouponRepository couponRepository;
	private final NotificationRepository notificationRepository;
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;

	@Bean
	public Job finishFundingJob() {
		return jobBuilderFactory.get("finishFundingJob")
			.incrementer(new RunIdIncrementer())
			.listener(new JobListener())
			.start(finishFundingStep())
			.build();
	}

	@Bean
	@JobScope
	public Step finishFundingStep() {
		return stepBuilderFactory.get("finishFundingStep")
			.<Funding, Pair<Funding, List<Coupon>>>chunk(10)
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
			List<Notification> notificationList = new ArrayList<>();

			if (funding.getFundingCurCount() < funding.getFundingMinLimit()) {
				// 실패
				// log.info("{} 실패" , funding.getFundingTitle());
				funding.changeFundingStatusByFail();
				for (UserFunding userFunding : funding.getUserFundings()) {
					// 펀딩 실패 알림
					User user = userFunding.getUser();
					notificationList.add(
						Notification.create(user, funding.getFundingTitle(), NotificationType.FUNDING_FAIL));
				}
			} else {
				// 성공
				// log.info("{} 성공" , funding.getFundingTitle());
				funding.changeFundingStatusBySuccess();

				for (UserFunding userFunding : funding.getUserFundings()) {
					// 쿠폰 발급
					User user = userFunding.getUser();
					Coupon coupon = Coupon.createCouponByFundingSuccess(user, funding);
					couponList.add(coupon);

					// 쿠폰 알림 생성
					String message = funding.getFundingTitle() + NotificationType.COUPON_CREATE.getMessage()
						+ coupon.getCouponExpirationDate();
					notificationList.add(
						Notification.create(user, message, NotificationType.COUPON_CREATE));
				}
			}
			notificationRepository.saveAll(notificationList);
			return Pair.of(funding, couponList);
		};
	}

	@Bean
	@StepScope
	public ItemWriter<Pair<Funding, List<Coupon>>> fundingWriter() {
		return items -> {
			//log.info("Writer 실행");
			List<Funding> fundingList = new ArrayList<>();
			List<Coupon> coupontList = new ArrayList<>();

			for (Pair<Funding, List<Coupon>> item : items) {
				fundingList.add(item.getFirst());

				if (item.getSecond().isEmpty())
					continue;
				item.getSecond().stream().forEach(coupon -> coupontList.add(coupon));
			}

			if (!fundingList.isEmpty())
				fundingRepository.saveAll(fundingList);

			if (!coupontList.isEmpty())
				couponRepository.saveAll(coupontList);
		};
	}

}
