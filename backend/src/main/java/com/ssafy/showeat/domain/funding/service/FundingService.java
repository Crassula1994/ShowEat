package com.ssafy.showeat.domain.funding.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;

public interface FundingService {
	void createFunding(CreateFundingRequestDto createFundingRequestDto , HttpServletRequest request);
	void applyFunding(Long fundingId , HttpServletRequest request);
	void cancelFunding(Long fundingId , HttpServletRequest request);
	FundingResponseDto getFunding(Long fundingId , HttpServletRequest request);
	Page<FundingListResponseDto> getFundingList(Long businessId, FundingIsActive state, int pageable,
		HttpServletRequest request);
}
