package com.ssafy.showeat.domain.business.dto.response;

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
@ApiModel(value = "월별 통계 조회 DTO", description = "업주가 월별 통계 조회 시 필요한 정보")
public class BusinessMonthlyStatResponseDto {

	@ApiModelProperty(value = "연도", example = "2023")
	private int year;

	@ApiModelProperty(value = "월", example = "7")
	private int month;

	@ApiModelProperty(value = "매출액", example = "100000")
	private int revenue;

	@ApiModelProperty(value = "성공 펀딩 수", example = "10")
	private int successFundingCnt;

	@ApiModelProperty(value = "펀딩 참여자 수", example = "1000")
	private int fundingParticipantsCnt;

	@ApiModelProperty(value = "실패 펀딩 수", example = "100000")
	private int failFundingCnt;
}
