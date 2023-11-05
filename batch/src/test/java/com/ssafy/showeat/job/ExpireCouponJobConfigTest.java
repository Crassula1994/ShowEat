package com.ssafy.showeat.job;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobInstance;
import org.springframework.batch.test.JobLauncherTestUtils;
import org.springframework.batch.test.context.SpringBatchTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.ssafy.showeat.config.TestBatchConfig;
import com.ssafy.showeat.domain.Coupon;
import com.ssafy.showeat.domain.CouponStatus;
import com.ssafy.showeat.domain.CouponType;
import com.ssafy.showeat.domain.Funding;
import com.ssafy.showeat.domain.FundingIsActive;
import com.ssafy.showeat.domain.FundingIsSuccess;
import com.ssafy.showeat.domain.User;
import com.ssafy.showeat.repository.CouponRepository;

@SpringBatchTest
@SpringBootTest
@ContextConfiguration(classes = {ExpireCouponsJobConfig.class, TestBatchConfig.class})
public class ExpireCouponJobConfigTest {

	@Autowired
	private JobLauncherTestUtils jobLauncherTestUtils;

	@Autowired
	private CouponRepository couponRepository;

	@Test
	public void test_expireCouponsStep() throws Exception {
		// given
		addCoupons(2);

		// when
		JobExecution jobExecution = jobLauncherTestUtils.launchJob();
		JobInstance jobInstance = jobExecution.getJobInstance();

		// then
		assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());
		assertEquals("expireCouponsJob", jobInstance.getJobName());
	}

	private void addCoupons(int size) {
		User user = User.builder()
			.userId(1L)
			.userMoney(1000)
			.userAddress("강남")
			.userBusiness(true)
			.visited(true)
			.userImgUrl("url")
			.userNickname("수정")
			.userPhone("01064731506")
			.build();

		Funding funding = Funding.builder()
			.fundingCurCount(1)
			.fundingCategory("카페")
			.fundingId(1L)
			.fundingDiscountPrice(10)
			.fundingDiscountRate(10)
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.SUCCESS)
			.fundingMaxLimit(1)
			.fundingMenu("커피")
			.fundingMinLimit(1)
			.fundingPrice(1000)
			.fundingTitle("커피")
			.fundingTotalAmount(1000)
			.fundingDescription("설명")
			.build();

		List<Coupon> coupons = new ArrayList<>();
		for (int i = 0; i < size; ++i) {
			Coupon coupon =  Coupon.builder()
				.couponPrice(funding.getFundingDiscountPrice())
				.couponStatus(CouponStatus.ACTIVE)
				.couponExpirationDate(LocalDate.now())
				.couponType(CouponType.SINGLE)
				.couponQrCodeImgUrl("")
				.user(user)
				.funding(funding)
				.build();
			coupons.add(coupon);
		}
		couponRepository.saveAll(coupons);
	}

}
