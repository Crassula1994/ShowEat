package com.ssafy.showeat.job;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManagerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaCursorItemReader;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaCursorItemReaderBuilder;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.support.SynchronizedItemStreamReader;
import org.springframework.batch.item.support.builder.SynchronizedItemStreamReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;

import com.ssafy.showeat.domain.Funding;
import com.ssafy.showeat.domain.FundingIsActive;
import com.ssafy.showeat.domain.Notification;
import com.ssafy.showeat.domain.NotificationType;
import com.ssafy.showeat.domain.UserFunding;
import com.ssafy.showeat.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class SendNotificationBeforeFinishFundingJobConfig {
	private final int CHUNK_SIZE = 10;
	private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final EntityManagerFactory entityManagerFactory;
	private final SendNotificationItemWriter sendNotificationItemWriter;
	private final NotificationRepository notificationRepository;

	@Bean
	public Job sendNotificationBeforeFinishFundingJob() {
		return this.jobBuilderFactory.get("sendNotificationBeforeFinishFundingJob")
			.start(addNotificationStep())
			.next(sendNotificationStep())
			.build();
	}

	@Bean
	public Step addNotificationStep() {
		return this.stepBuilderFactory.get("addNotificationStep")
			.<Funding, List<Notification>>chunk(CHUNK_SIZE)
			.reader(addNotificationItemReader())
			.processor(addNotificationItemProcessor())
			.writer(addNotificationItemWriter())
			.build();
	}

	/**
	 * JpaPagingItemReader: JPA에서 사용하는 페이징 기법입니다.
	 * 쿼리 당 pageSize만큼 가져오며 다른 PagingItemReader와 마찬가지로 Thread-safe 합니다.
	 */
	@Bean
	public JpaPagingItemReader<Funding> addNotificationItemReader() {
		return new JpaPagingItemReaderBuilder<Funding>()
			.name("addNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// pageSize: 한 번에 조회할 row 수
			.pageSize(CHUNK_SIZE)
			// 펀딩상태(fundingIsActive)가 ACTIVE이며, 펀딩 마감일(fundingEndDate) 하루 전 알람 대상이 됩니다.
			.queryString("select f from Funding f " +
				"join fetch f.bookmarks b " +
				"join fetch b.user u " +
				"where f.fundingIsActive = :fundingIsActive " +
				"and f.fundingEndDate <= :fundingEndDate ")
			.parameterValues(
				Map.of("fundingIsActive", FundingIsActive.ACTIVE, "fundingEndDate", LocalDate.now().plusDays(1L)))
			.build();
	}

	@Bean
	public ItemProcessor<Funding, List<Notification>> addNotificationItemProcessor() {
		log.info("addNotificationItemProcessor 실행");
		return funding -> {
			String message = funding.getFundingTitle() + NotificationType.FUNDING_DEADLINE.getMessage()
				+ dateFormat.format(funding.getFundingEndDate());

			List<Notification> notifications = new ArrayList<>(funding.getUserFundings().size());
			for (UserFunding userFunding : funding.getUserFundings()) {
				notifications.add(
					Notification.create(userFunding.getUser(), funding, message, NotificationType.FUNDING_DEADLINE));
			}
			log.info("addNotificationItemProcessor 실행 funding = {}", funding);
			log.info("addNotificationItemProcessor 실행 notifications = {}", notifications);
			return notifications;
		};
	}

	@Bean
	public ItemWriter<List<Notification>> addNotificationItemWriter() {
		log.info("addNotificationItemWriter 실행");
		return items -> {
			for (List<Notification> notifications : items) {
				if (!notifications.isEmpty()) {
					notificationRepository.saveAll(notifications);
				}
			}
		};
	}

	/**
	 * reader는 synchrosized로 순차적으로 실행되지만 writer는 multi-thread 로 동작합니다.
	 */
	@Bean
	public Step sendNotificationStep() {
		log.info("sendNotificationStep 실행");
		return this.stepBuilderFactory.get("sendNotificationStep")
			.<Notification, Notification>chunk(CHUNK_SIZE)
			.reader(sendNotificationItemReader())
			.writer(sendNotificationItemWriter)
			.taskExecutor(new SimpleAsyncTaskExecutor()) // 가장 간단한 멀티쓰레드 TaskExecutor를 선언하였습니다.
			.build();
	}

	/**
	 * SynchronizedItemStreamReader: multi-thread 환경에서 reader와 writer는 thread-safe 해야합니다.
	 * Cursor 기법의 ItemReader는 thread-safe하지 않아 Paging 기법을 사용하거나 synchronized 를 선언하여 순차적으로 수행해야합니다.
	 */
	@Bean
	public SynchronizedItemStreamReader<Notification> sendNotificationItemReader() {
		log.info("sendNotificationItemReader 실행");
		JpaCursorItemReader<Notification> itemReader = new JpaCursorItemReaderBuilder<Notification>()
			.name("sendNotificationItemReader")
			.entityManagerFactory(entityManagerFactory)
			// 발송 여부(notificationSent)가 미발송인 알람이 조회 대상이 됩니다.
			.queryString("select n from Notification n "
				+ "join fetch n.funding f "
				+ "join fetch n.user u "
                + "where n.notificationType = :notificationType "
                + "and n.notificationSent = :notificationSent")
			.parameterValues(Map.of("notificationType", NotificationType.FUNDING_DEADLINE, "notificationSent", false))
			.build();

		return new SynchronizedItemStreamReaderBuilder<Notification>()
			.delegate(itemReader)
			.build();
	}

}
