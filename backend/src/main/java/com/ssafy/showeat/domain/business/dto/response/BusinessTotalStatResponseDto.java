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
@ApiModel(value = "누적 통계 조회 DTO", description = "업주가 누적 통계 조회 시 필요한 정보")
public class BusinessTotalStatResponseDto {

	@ApiModelProperty(value = "업체명", example = "카우카우")
	private String businessName;

	@ApiModelProperty(value = "누적 매출액", example = "100000")
	private int totalRevenue;

	@ApiModelProperty(value = "누적 성공 펀딩 수", example = "10")
	private int totalSuccessFundingCnt;

	@ApiModelProperty(value = "누적 성공 펀딩 참여자 수", example = "1000")
	private int totalFundingParticipantsCnt;

	@ApiModelProperty(value = "누적 실패 펀딩 수", example = "10")
	private int totalFailFundingCnt;
}
