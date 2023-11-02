package com.ssafy.showeat.domain.funding.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.MathExpressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessTotalStatResponseDto;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.QBusiness;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingCategory;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.entity.FundingSearchType;
import com.ssafy.showeat.domain.funding.entity.FundingSortType;
import com.ssafy.showeat.domain.funding.entity.QFunding;
import com.ssafy.showeat.domain.funding.entity.QFundingTag;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Repository
public class FundingCustomRepositoryImpl implements FundingCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;
	private final QFunding funding = QFunding.funding;
	private final QBusiness business = QBusiness.business;
	private final QFundingTag fundingTag = QFundingTag.fundingTag1;

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
	public List<Funding> findByType(String type) {
		return jpaQueryFactory
			.selectFrom(funding)
			.where(funding.fundingIsActive.eq(FundingIsActive.ACTIVE))
			.orderBy(fundingSort(type))
			.limit(15)
			.fetch();
	}

	@Override
	public Page<Funding> findBySearchFundingRequestDto(SearchFundingRequestDto searchFundingRequestDto , Pageable pageable) {
		List<Funding> content = jpaQueryFactory
			.selectFrom(funding)
			.innerJoin(business)
			.on(funding.business.businessId.eq(business.businessId))
			.where(
				funding.fundingIsActive.eq(FundingIsActive.ACTIVE),
				searchFundingByCondition(searchFundingRequestDto)
			)
			.orderBy(fundingSort(searchFundingRequestDto.getSortType()))
			.limit(pageable.getPageSize())
			.offset(pageable.getOffset())
			.fetch();

		Long count = jpaQueryFactory
			.select(funding.count())
			.from(funding)
			.innerJoin(business)
			.on(funding.business.businessId.eq(business.businessId))
			.where(
				funding.fundingIsActive.eq(FundingIsActive.ACTIVE),
				searchFundingByCondition(searchFundingRequestDto)
			)
			.fetchOne();

		return new PageImpl<>(content, pageable, count);
	}
	private BooleanBuilder searchFundingByCondition(SearchFundingRequestDto searchFundingRequestDto){
		BooleanBuilder mainBuilder = new BooleanBuilder();
		BooleanBuilder searchTypeBuilder = new BooleanBuilder();
		BooleanBuilder categoryBuilder = new BooleanBuilder();
		BooleanBuilder guAddressBuilder = new BooleanBuilder();
		BooleanBuilder priceBuilder = new BooleanBuilder();

		for (String searchType : searchFundingRequestDto.getSearchType()) {
			if(searchType.equals(FundingSearchType.BUSINESS_NAME.name()))
				getFundingByBusinessName(searchTypeBuilder , searchFundingRequestDto.getKeyword());

			if(searchType.equals(FundingSearchType.FUNDING_MENU.name()))
				getFundingByFundingMenu(searchTypeBuilder , searchFundingRequestDto.getKeyword());

			if(searchType.equals(FundingSearchType.FUNDING_TAG.name()))
				getFundingByTag(searchTypeBuilder , searchFundingRequestDto.getKeyword());
		}
		getFundingByCategory(categoryBuilder , searchFundingRequestDto.getCategory());
		getFundingByGuAddress(guAddressBuilder , searchFundingRequestDto.getAddress());
		getFundingByMinAndMaxPrice(priceBuilder , searchFundingRequestDto.getMin() , searchFundingRequestDto.getMax());

		mainBuilder
			.and(searchTypeBuilder)
			.and(categoryBuilder)
			.and(guAddressBuilder)
			.and(priceBuilder);

		return mainBuilder;
	}

	private void getFundingByMinAndMaxPrice(BooleanBuilder builder , int minPrice , int maxPrice){
		builder.and(funding.fundingDiscountPrice.between(minPrice,maxPrice));
	}

	private void getFundingByGuAddress(BooleanBuilder builder , List<String> guAddressList){
		for (String gu : guAddressList)
			builder.or(business.businessAddress.contains(gu));

	}

	private void getFundingByCategory(BooleanBuilder builder , List<String> categoryList){
		List<FundingCategory> collect = categoryList.stream()
			.map(s -> FundingCategory.valueOf(s))
			.collect(Collectors.toList());

		builder.or(funding.fundingCategory.in(collect));
	}

	private void getFundingByTag(BooleanBuilder builder , String tag){
		List<Long> fundingIdListByTag = getFundingIdListByTag(tag);
		builder.or(funding.fundingId.in(fundingIdListByTag));
	}

	private List<Long> getFundingIdListByTag(String tag){
		return jpaQueryFactory
			.select(fundingTag.funding.fundingId)
			.from(fundingTag)
			.where(fundingTag.fundingTag.contains(tag))
			.fetch();
	}

	private void getFundingByFundingMenu(BooleanBuilder builder , String fundingMenu){
		builder.or(funding.fundingMenu.contains(fundingMenu));
	}

	private void getFundingByBusinessName(BooleanBuilder builder , String businessName){
		// List<Long> businessIdListByBusinessName = getBusinessIdListByBusinessName(businessName);
		// builder.or(funding.fundingId.in(businessIdListByBusinessName));
		builder.or(business.businessName.contains(businessName));
	}

	private List<Long> getBusinessIdListByBusinessName(String businessName){
		return jpaQueryFactory
			.select(business.businessId)
			.from(business)
			.where(business.businessName.contains(businessName))
			.fetch();
	}

	private OrderSpecifier<?> fundingSort(String sortType){
		if (sortType.equals(FundingSortType.POPULARITY.name()))
			return new OrderSpecifier(Order.DESC, participationRate());
		if(sortType.equals(FundingSortType.CLOSING_SOON.name()))
			return new OrderSpecifier(Order.ASC, funding.fundingEndDate);
		if(sortType.equals(FundingSortType.LOW_PRICE.name()))
			return new OrderSpecifier(Order.ASC, funding.fundingDiscountPrice);
		if(sortType.equals(FundingSortType.HIGH_DISCOUNT_RATE.name()))
			return new OrderSpecifier(Order.DESC, funding.fundingDiscountRate);

		return null;
	}

	private NumberExpression participationRate(){
		return MathExpressions.round(
			funding.fundingCurCount.castToNum(Double.class)
				.divide(funding.fundingMinLimit.castToNum(Double.class))
				.multiply(100.0));
	}
}
