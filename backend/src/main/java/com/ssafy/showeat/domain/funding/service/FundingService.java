package com.ssafy.showeat.domain.funding.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.google.zxing.WriterException;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingIsZzimAndIsParticipate;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.user.entity.User;

public interface FundingService {
	Long createFunding(CreateFundingRequestDto createFundingRequestDto , User user);
	void applyFunding(Long fundingId , User user) throws IOException, WriterException;
	void cancelFunding(Long fundingId , User user);
	FundingResponseDto getFunding(Long fundingId);
	Page<FundingListResponseDto> getFundingList(FundingIsActive state, int pageable , User user);
	Page<FundingListResponseDto> getUserFundingList(User user,int page);
	Page<FundingListResponseDto> getUserFundingListByBookmark(User user,int page);
	List<FundingListResponseDto> getBusinessFundingList(Long businessId);
	Page<FundingListResponseDto> searchFunding(SearchFundingRequestDto searchFundingRequestDto);
	List<FundingListResponseDto> getFundingByType(String type);
	Page<FundingListResponseDto> getFundingByCategory(String category , String sortType , int page);
	FundingIsZzimAndIsParticipate getUserFundingIsZzimAndIsParticipate(Long fundingId,Long userId);
	void addImageToFunding(Long fundingId , MultipartFile multipartFile , User user) throws IOException;
}
