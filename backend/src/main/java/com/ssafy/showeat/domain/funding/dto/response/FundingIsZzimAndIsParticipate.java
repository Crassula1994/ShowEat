package com.ssafy.showeat.domain.funding.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "유저의 펀딩 참여,찜 여부 DTO" , description = "유저의 펀딩 참여,찜 여부")
public class FundingIsZzimAndIsParticipate {

	boolean fundingIsZzim;

	boolean fundingIsParticipate;
}
