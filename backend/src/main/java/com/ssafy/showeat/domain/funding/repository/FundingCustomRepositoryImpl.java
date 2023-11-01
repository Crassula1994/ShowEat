package com.ssafy.showeat.domain.funding.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessTotalStatResponseDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.entity.QFunding;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Repository
public class FundingCustomRepositoryImpl implements FundingCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;
	private final QFunding funding = QFunding.funding;

	@Override
	public List<BusinessMonthlyStatResponseDto> findMonthlyStatListById(Long businessId) {
		LocalDate currentDate = LocalDate.now();

		List<BusinessMonthlyStatResponseDto> monthlyStatResponseDto = jpaQueryFactory
			.select(
				Projections.constructor(
					BusinessMonthlyStatResponseDto.class,
					funding.fundingEndDate.year().as("year"),
					funding.fundingEndDate.month().as("month"),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(funding.fundingCurCount.multiply(funding.fundingDiscountPrice))
							.otherwise(0)
							.sum()
						, "revenue"
					),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(1)
							.otherwise(0)
							.sum()
						, "successFundingCnt"
					),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(funding.fundingCurCount)
							.otherwise(0)
							.sum()
						, "fundingParticipantsCnt"
					),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.FAIL))
							.then(1)
							.otherwise(0)
							.sum()
						, "failFundingCnt"
					)
				)
			)
			.from(funding)
			.where(
				funding.business.businessId.eq(businessId),
				funding.fundingEndDate.before(currentDate)
			)
			.groupBy(funding.fundingEndDate.year(), funding.fundingEndDate.month())
			.orderBy(funding.fundingEndDate.year().asc(), funding.fundingEndDate.month().asc())
			.fetch();

		return monthlyStatResponseDto;
	}

	@Override
	public BusinessTotalStatResponseDto findTotalStatById(Long businessId) {
		LocalDate currentDate = LocalDate.now();

		List<BusinessTotalStatResponseDto> totalStatResponseDto = jpaQueryFactory
			.select(
				Projections.constructor(
					BusinessTotalStatResponseDto.class,
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(funding.fundingCurCount.multiply(funding.fundingDiscountPrice))
							.otherwise(0)
							.sum()
						, "totalRevenue"
					),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(1)
							.otherwise(0)
							.sum()
						, "totalSuccessFundingCnt"
					),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(funding.fundingCurCount)
							.otherwise(0)
							.sum()
						, "totalFundingParticipantsCnt"
					),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.FAIL))
							.then(1)
							.otherwise(0)
							.sum()
						, "totalFailFundingCnt"
					)
				)
			)
			.from(funding)
			.where(
				funding.business.businessId.eq(businessId),
				funding.fundingEndDate.before(currentDate)
			)
			.fetch();

		return totalStatResponseDto.get(0);
	}

	@Override
	public Page<FundingListResponseDto> findBySearchFundingRequestDto(SearchFundingRequestDto searchFundingRequestDto , Pageable pageable) {

		// 카테고리가 없다면 모든 카테고리내에서 검색

		// 지역이 없다면 모든 지역에서 검색

		//

		return null;
	}
}
