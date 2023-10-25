package com.ssafy.showeat.domain.funding.repository;

import java.util.List;

import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;

public interface FundingCustomRepository {
	List<BusinessMonthlyStatResponseDto> findMonthlyStatListById(Long businessId);
}
