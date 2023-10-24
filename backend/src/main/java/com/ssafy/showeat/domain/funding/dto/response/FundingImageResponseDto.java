package com.ssafy.showeat.domain.funding.dto.response;

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
@ApiModel(value = "펀딩 이미지 조회 DTO" , description = "펀딩의 이미지 정보")
public class FundingImageResponseDto {

	@ApiModelProperty(value = "펀딩 이미지 ID")
	private Long imageId;

	@ApiModelProperty(value = "펀딩 이미지 URL")
	private String imageUrl;
}
