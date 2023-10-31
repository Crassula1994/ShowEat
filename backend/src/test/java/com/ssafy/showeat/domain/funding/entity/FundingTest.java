package com.ssafy.showeat.domain.funding.entity;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class FundingTest {

	@Test
	@DisplayName("펀딩 참여자가 늘어날시 펀딩 참여금액이 discountPrice만큼 증가한다.")
	void 펀딩참여시_펀딩참여금액증가() {
	    // given
		Funding funding = createFundingForCheckTotalAmount(0,7000);

	    // when
		funding.addMoneyForApply();

	    // then
		assertThat(funding.getFundingTotalAmount()).isEqualTo(7000);
	}

	@Test
	@DisplayName("펀딩이 최대제한갯수에 도달시 더이상 펀딩에 참여할 수 없습니다.")
	void 펀딩최대참여_제한확인() {
	    // given
		Funding funding = createFundingForCheckMaxLimit(9,10);
		boolean prevFundingIsApply = funding.isApply();

	    // when
		funding.addCountForApply();
		boolean isApply = funding.isApply();

		// then
		assertThat(prevFundingIsApply).isEqualTo(true);
		assertThat(isApply).isFalse();
	}

	@Test
	@DisplayName("펀딩에 참여시 참여수가 증가한다.")
	void 펀딩참여시_참여수증가() {
		// given
		Funding funding = createFundingForCheckMaxLimit(0,10);

		// when
		funding.addCountForApply();

		// then
		assertThat(funding.getFundingCurCount()).isEqualTo(1);
	}

	@Test
	@DisplayName("펀딩이 종료될시 펀딩상태가 INACTIVE로 변경된다.")
	void 펀딩최대참여도달시_펀딩종료() {
		// given
		Funding funding = createFundingForCheckMaxLimit(9,10);

		// when
		funding.addCountForApply();
		if(funding.isMaxLimit())
			funding.changeFundingStatusByMaxApply();

		// then
		assertThat(funding.getFundingIsActive()).isEqualTo(FundingIsActive.INACTIVE);
	}

	@Test
	@DisplayName("펀딩취소시 펀딩참여수가 감소한다.")
	void 펀딩취소() {
	    // given
		Funding funding = createFundingForCheckMaxLimit(1,10);

	    // when
		funding.cancelFunding();

	    // then
		assertThat(funding.getFundingCurCount()).isEqualTo(0);
	}

	private Funding createFundingForCheckMaxLimit(
		int curCount,
		int maxLimit
	){
		return Funding.builder()
			.fundingTitle("맛있는 과자에요")
			.fundingMaxLimit(maxLimit)
			.fundingMinLimit(0)
			.fundingCurCount(curCount)
			.fundingDiscountPrice(7000)
			.fundingDiscountRate(10)
			.fundingMenu("과자")
			.fundingPrice(10000)
			.fundingTotalAmount(0)
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.SUCCESS)
			.business(null)
			.build();
	}

	private Funding createFundingForCheckTotalAmount(
		int totalAmount,
		int discountPrice
	){
		return Funding.builder()
			.fundingTitle("맛있는 과자에요")
			.fundingMaxLimit(150)
			.fundingMinLimit(50)
			.fundingCurCount(100)
			.fundingDiscountPrice(discountPrice)
			.fundingDiscountRate(10)
			.fundingMenu("과자")
			.fundingPrice(10000)
			.fundingTotalAmount(totalAmount)
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.SUCCESS)
			.business(null)
			.build();
	}
}