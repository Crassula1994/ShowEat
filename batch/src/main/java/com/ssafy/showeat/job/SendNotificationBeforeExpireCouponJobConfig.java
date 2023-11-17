package com.ssafy.showeat.job;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import javax.persistence.EntityManagerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaCursorItemReader;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaCursorItemReaderBuilder;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.support.SynchronizedItemStreamReader;
import org.springframework.batch.item.support.builder.SynchronizedItemStreamReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;

import com.ssafy.showeat.domain.Coupon;
import com.ssafy.showeat.domain.CouponStatus;
import com.ssafy.showeat.domain.Notification;
import com.ssafy.showeat.domain.NotificationType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class SendNotificationBeforeExpireCouponJobConfig {
	private final int CHUNK_SIZE = 10;
	private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final EntityManagerFactory entityManagerFactory;
	private final SendNotificationItemWriter sendNotificationItemWriter;

	@Bean
	public Job sendNotificationBeforeExpireCouponJob() {
		return this.jobBuilderFactory.get("sendNotificationBeforeExpireCouponJob")
			.start(addExpireCouponNotificationStep())
			.next(sendExpireCouponNotificationStep())
			.build();
	}

	@Bean
	public Step addExpireCouponNotificationStep() {
		return this.stepBuilderFactory.get("addExpireCouponNotificationStep")
			.<Coupon, Notification>chunk(CHUNK_SIZE)
			.reader(addExpireCouponNotificationItemReader())
			.processor(addExpireCouponNotificationItemProcessor())
			.writer(addExpireCouponNotificationItemWriter())
			.build();
	}

	@Bean
	public JpaPagingItemReader<Coupon> addExpireCouponNotificationItemReader() {
		return new JpaPagingItemReaderBuilder<Coupon>()
			.name("addExpireCouponNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// pageSize: 한 번에 조회할 row 수
			.pageSize(CHUNK_SIZE)
			// CouponStatus가 ACTIVE이며, 쿠폰 마감일(couponExpirationDate) 하루 전 알람 대상이 됩니다.
			.queryString("select c from Coupon c " +
				"join fetch c.funding f " +
				"join fetch c.user u " +
				"where c.couponStatus = :couponStatus " +
				"and c.couponExpirationDate <= :couponExpirationDate ")
			.parameterValues(
				Map.of("couponStatus", CouponStatus.ACTIVE, "couponExpirationDate", LocalDate.now().plusDays(1L)))
			.build();
	}

	@Bean
	public ItemProcessor<Coupon, Notification> addExpireCouponNotificationItemProcessor() {
		log.info("addExpireCouponNotificationItemProcessor 실행");
		return coupon -> {
			String message = coupon.getFunding().getFundingTitle() + NotificationType.COUPON_DEADLINE.getMessage()
				+ dateFormat.format(coupon.getCouponExpirationDate());
			return Notification.create(coupon.getUser(), coupon.getFunding(), message,
				NotificationType.COUPON_DEADLINE);
		};
	}

	@Bean
	public JpaItemWriter<Notification> addExpireCouponNotificationItemWriter() {
		return new JpaItemWriterBuilder<Notification>()
			.entityManagerFactory(entityManagerFactory)
			.build();
	}

	@Bean
	public Step sendExpireCouponNotificationStep() {
		log.info("sendNotificationStep 실행");
		return this.stepBuilderFactory.get("sendExpireCouponNotificationStep")
			.<Notification, Notification>chunk(CHUNK_SIZE)
			.reader(sendExpireCouponNotificationItemReader())
			.writer(sendNotificationItemWriter)
			.taskExecutor(new SimpleAsyncTaskExecutor()) // 가장 간단한 멀티쓰레드 TaskExecutor를 선언하였습니다.
			.build();
	}

	@Bean
	public SynchronizedItemStreamReader<Notification> sendExpireCouponNotificationItemReader() {
		log.info("sendExpireCouponNotificationItemReader 실행");
		JpaCursorItemReader<Notification> itemReader = new JpaCursorItemReaderBuilder<Notification>()
			.name("sendExpireCouponNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// 발송 여부(notificationSent)가 미발송인 알람이 조회 대상이 됩니다.
			.queryString("select n from Notification n "
				+ "join fetch n.funding f "
				+ "join fetch n.user u "
				+ "where n.notificationType = :notificationType "
				+ "and n.notificationSent = :notificationSent")
			.parameterValues(Map.of("notificationType", NotificationType.COUPON_DEADLINE, "notificationSent", false))
			.build();

		return new SynchronizedItemStreamReaderBuilder<Notification>()
			.delegate(itemReader)
			.build();
	}

}
