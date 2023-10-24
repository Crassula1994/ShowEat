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
@ApiModel(value = "펀딩 태그 조회 DTO" , description = "펀딩의 태그 정보")
public class FundingTagResponseDto {

	@ApiModelProperty(value = "펀딩 태그 ID")
	private Long tagId;

	@ApiModelProperty(value = "펀딩 태그")
	private String fundingTag;
}
