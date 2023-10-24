package com.ssafy.showeat.domain.funding.service;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;

public interface FundingService {
	void createFunding(CreateFundingRequestDto createFundingRequestDto);
	void applyFunding(Long fundingId);
	void cancelFunding(Long fundingId);
	FundingResponseDto getFunding(Long fundingId);
}
