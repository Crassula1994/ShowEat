package com.ssafy.showeat.domain.funding.dto.request;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingImage;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.entity.FundingTag;

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

	@ApiModelProperty(value = "펀딩 분류")
	private String category;

	@ApiModelProperty(value = "펀딩 최대 갯수 제한", example = "10")
	private int maxLimit;

	@ApiModelProperty(value = "펀딩 최소 갯수 제한" , example = "5")
	private int minLimit;

	@ApiModelProperty(value = "펀딩 메뉴 관련 정보")
	private List<MenuRequestDto> menuRequestDtos;

	@ApiModelProperty(value = "펀딩 종료일")
	private LocalDate endDate;

	@ApiModelProperty(value = "검색용 태그")
	private List<String> tags;

	public Funding createFunding(
			Business business,
			BusinessMenu businessMenu,
			int discountPrice){

		List<FundingTag> fundingTags = tags.stream()
			.map(s -> FundingTag.builder().fundingTag(s).build())
			.collect(Collectors.toList());

		List<FundingImage> fundingImages = businessMenu.getBusinessMenuImages().stream()
			.map(businessMenuImage -> FundingImage.builder()
				.fundingImgUrl(businessMenuImage.getBusinessMenuImageUrl())
				.build())
			.collect(Collectors.toList());

		return Funding.builder()
			.fundingTitle(title)
			.fundingMaxLimit(maxLimit)
			.fundingMinLimit(minLimit)
			.fundingCurCount(0)
			.fundingMenu(businessMenu.getBusinessMenuName())
			.fundingPrice(businessMenu.getBusinessMenuPrice())
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.UNDECIEDED)
			.fundingDiscountPrice(discountPrice)
			.fundingEndDate(endDate)
			.business(business)
			.fundingTags(fundingTags)
			.fundingImages(fundingImages)
			.build();
	}


}
