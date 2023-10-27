package com.ssafy.showeat.domain.funding.service;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;

public interface FundingService {
	void createFunding(CreateFundingRequestDto createFundingRequestDto , HttpServletRequest request);
	void applyFunding(Long fundingId , HttpServletRequest request);
	void cancelFunding(Long fundingId , HttpServletRequest request);
	FundingResponseDto getFunding(Long fundingId , HttpServletRequest request);
}
