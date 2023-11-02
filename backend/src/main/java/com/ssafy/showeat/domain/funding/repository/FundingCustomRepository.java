package com.ssafy.showeat.domain.funding.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessTotalStatResponseDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.entity.Funding;

public interface FundingCustomRepository {
	List<BusinessMonthlyStatResponseDto> findMonthlyStatListById(Long businessId);
	Page<Funding> findBySearchFundingRequestDto(SearchFundingRequestDto searchFundingRequestDto,
		Pageable pageable);
	BusinessTotalStatResponseDto findTotalStatById(Long businessId);
	List<Funding>  findByType(String type);
}
