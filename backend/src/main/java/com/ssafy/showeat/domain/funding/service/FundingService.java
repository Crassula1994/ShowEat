package com.ssafy.showeat.domain.funding.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.user.entity.User;

public interface FundingService {
	void createFunding(CreateFundingRequestDto createFundingRequestDto , User user);
	void applyFunding(Long fundingId , User user);
	void cancelFunding(Long fundingId , User user);
	FundingResponseDto getFunding(Long fundingId , User user);
	Page<FundingListResponseDto> getFundingList(FundingIsActive state, int pageable, User user);
	Page<FundingListResponseDto> getUserFundingList(User user,int page);
	Page<FundingListResponseDto> getUserFundingListByBookmark(User user,int page);
	Page<FundingListResponseDto> searchFunding(SearchFundingRequestDto searchFundingRequestDto,User user);
	List<FundingListResponseDto> getFundingByType(String type,User user);
	Page<FundingListResponseDto> getFundingByCategory(String category , String sortType , int page , User user);
}
