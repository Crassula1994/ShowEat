package com.ssafy.showeat.job;

import java.time.LocalDate;
import java.util.Map;

import javax.persistence.EntityManagerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaCursorItemReader;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.builder.JpaCursorItemReaderBuilder;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ssafy.showeat.domain.Coupon;
import com.ssafy.showeat.domain.CouponStatus;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ExpireCouponsJobConfig {
	private final int CHUNK_SIZE = 10;

	// @EnableBatchProcessing로 인해 Bean으로 제공된 JobBuilderFactory, StepBuilderFactory
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final EntityManagerFactory entityManagerFactory;

	@Bean
	public Job expireCouponsJob() {
		return this.jobBuilderFactory.get("expireCouponsJob")
			.start(expireCouponsStep())
			.build();
	}

	@Bean
	public Step expireCouponsStep() {
		return this.stepBuilderFactory.get("expireCouponsStep")
			.<Coupon, Coupon>chunk(CHUNK_SIZE)
			.reader(expireCouponsItemReader())
			.processor(expireCouponsItemProcessor())
			.writer(expireCouponsItemWriter())
			.build();
	}

	/**
	 * JpaCursorItemReader: JpaPagingItemReader만 지원하다가 Spring 4.3에서 추가되었습니다.
	 * 페이징 기법보다 보다 높은 성능으로, 데이터 변경에 무관한 무결성 조회가 가능합니다.
	 */
	@Bean
	@StepScope
	public JpaCursorItemReader<Coupon> expireCouponsItemReader() {
		return new JpaCursorItemReaderBuilder<Coupon>()
			.name("expireCouponsItemReader")
			.entityManagerFactory(entityManagerFactory)
			// 상태(status)가 ACTIVE이며, 종료일시(couponExpirationDate)이 현재 시점보다 과거일 경우 만료 대상이 됩니다.
			.queryString("select c from Coupon c where c.couponStatus = :couponStatus and c.couponExpirationDate <= :couponExpirationDate")
			.parameterValues(Map.of("couponStatus", CouponStatus.ACTIVE, "couponExpirationDate", LocalDate.now()))
			.build();
	}

	@Bean
	public ItemProcessor<Coupon, Coupon> expireCouponsItemProcessor() {
		return coupon -> {
			coupon.updateStatus(CouponStatus.EXPIRED);
			return coupon;
		};
	}

	/**
	 * JpaItemWriter: JPA의 영속성 관리를 위해 EntityManager를 필수로 설정해줘야 합니다.
	 */
	@Bean
	public JpaItemWriter<Coupon> expireCouponsItemWriter() {
		return new JpaItemWriterBuilder<Coupon>()
			.entityManagerFactory(entityManagerFactory)
			.build();
	}

}
