package com.ssafy.showeat.domain.funding.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;

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
@ApiModel(value = "펀딩 목록 조회 DTO" , description = "펀딩 목록 조회시 필요한 정보들")
public class FundingListResponseDto {

	@ApiModelProperty(value = "펀딩 아이디")
	private Long fundingId;

	@ApiModelProperty(value = "펀딩 제목")
	private String title;

	@ApiModelProperty(value = "업체명")
	private String businessName;

	@ApiModelProperty(value = "펀딩 분류")
	private String category;

	@ApiModelProperty(value = "펀딩 최대 갯수 제한")
	private int maxLimit;

	@ApiModelProperty(value = "펀딩 최소 갯수 제한")
	private int minLimit;

	@ApiModelProperty(value = "펀딩 현재 참여 횟수")
	private int curCount;

	@ApiModelProperty(value = "펀딩 메뉴")
	private String menu;

	@ApiModelProperty(value = "펀딩 메뉴 원가")
	private int price;

	@ApiModelProperty(value = "펀딩 메뉴 할인가")
	private int discountPrice;

	@ApiModelProperty(value = "펀딩 메뉴 할인률")
	private int discountRate;

	@ApiModelProperty(value = "펀딩 시작일")
	private LocalDate startDate;

	@ApiModelProperty(value = "펀딩 마감일")
	private LocalDate endDate;

	@ApiModelProperty(value = "펀딩 상태")
	private FundingIsActive fundingIsActive;

	@ApiModelProperty(value = "펀딩 성공 여부")
	private FundingIsSuccess fundingIsSuccess;

	@ApiModelProperty(value = "펀딩 메뉴 이미지 리스트")
	private List<FundingImageResponseDto> fundingImageResponseDtos;

	@ApiModelProperty(value = "사용자의 관심 펀딩 여부")
	private boolean fundingIsBookmark;

}
