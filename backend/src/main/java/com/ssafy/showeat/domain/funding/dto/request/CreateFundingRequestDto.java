package com.ssafy.showeat.domain.funding.dto.request;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingCategory;
import com.ssafy.showeat.domain.funding.entity.FundingImage;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.entity.FundingTag;
import com.ssafy.showeat.domain.funding.entity.FundingType;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "펀딩 생성 DTO" , description = "업주가 펀딩 생성할 시 필요한 정보")
public class CreateFundingRequestDto {

	@ApiModelProperty(value = "펀딩 제목", example = "마시따")
	private String title;

	@ApiModelProperty(value = "펀딩 타입",example = "GIFT_CARD")
	private String fundingType;

	@ApiModelProperty(value = "펀딩 분류")
	private String category;

	@ApiModelProperty(value = "펀딩 최대 갯수 제한", example = "10")
	private int maxLimit;

	@ApiModelProperty(value = "펀딩 최소 갯수 제한" , example = "5")
	private int minLimit;

	@ApiModelProperty(value = "펀딩 설명" , example = "이 펀딩은...")
	private String description;

//	@ApiModelProperty(value = "펀딩 메뉴 관련 정보")
//	private List<MenuRequestDto> menuRequestDtos;
	@ApiModelProperty(value = "메뉴 아이디" , example = "1")
	private Long menuId;

	@ApiModelProperty(value = "원가" , example = "8000")
	private int price;

	@ApiModelProperty(value = "할인가" , example = "5000")
	private int discountPrice;

	@ApiModelProperty(value = "펀딩 종료일")
	private LocalDate endDate;

	@ApiModelProperty(value = "검색용 태그")
	private List<String> tags;

	public Funding createMenuFunding(
			Business business,
			BusinessMenu businessMenu){

		double discountRate = ((double) (businessMenu.getBusinessMenuPrice() - discountPrice) / businessMenu.getBusinessMenuPrice() ) * 100;

		Funding funding = Funding.builder()
			.fundingTitle(title)
			.fundingBusinessName(business.getBusinessName())
			.fundingMaxLimit(maxLimit)
			.fundingMinLimit(minLimit)
			.fundingType(FundingType.valueOf(fundingType))
			.fundingCategory(FundingCategory.valueOf(category))
			.fundingCurCount(0)
			.fundingTotalAmount(0)
			.fundingMenu(businessMenu.getBusinessMenuName())
			.fundingPrice(businessMenu.getBusinessMenuPrice())
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.UNDECIDED)
			.fundingDiscountPrice(discountPrice)
			.fundingDiscountRate((int) Math.round(discountRate))
			.fundingDescription(description)
			.fundingEndDate(endDate)
			.business(business)
			.fundingTags(new ArrayList<>())
			.fundingImages(new ArrayList<>())
			.build();

		businessMenu.getBusinessMenuImages().stream()
			.map(businessMenuImage -> FundingImage.builder()
				.fundingImgUrl(businessMenuImage.getBusinessMenuImageUrl())
				.build()).forEach(fundingImage -> funding.addFundingImage(fundingImage));

		tags.stream()
			.map(s -> FundingTag.builder().fundingTag(s).build())
			.forEach(fundingTag -> funding.addFundingTag(fundingTag));

		return funding;
	}

	public Funding createGifrCardFunding(Business business){
		double discountRate = ((double) (price - discountPrice) / price ) * 100;

		Funding funding = Funding.builder()
			.fundingTitle(title)
			.fundingBusinessName(business.getBusinessName())
			.fundingMaxLimit(maxLimit)
			.fundingMinLimit(minLimit)
			.fundingType(FundingType.valueOf(fundingType))
			.fundingCategory(FundingCategory.valueOf(category))
			.fundingCurCount(0)
			.fundingTotalAmount(0)
			.fundingPrice(price)
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.UNDECIDED)
			.fundingDiscountPrice(discountPrice)
			.fundingDiscountRate((int) Math.round(discountRate))
			.fundingDescription(description)
			.fundingEndDate(endDate)
			.business(business)
			.fundingTags(new ArrayList<>())
			.fundingImages(new ArrayList<>())
			.build();

		tags.stream()
			.map(s -> FundingTag.builder().fundingTag(s).build())
			.forEach(fundingTag -> funding.addFundingTag(fundingTag));

		return funding;
	}


}
