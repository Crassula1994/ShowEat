package com.ssafy.showeat.domain.review.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.showeat.domain.review.dto.request.ReviewRequestDto;
import com.ssafy.showeat.domain.review.dto.response.FundingReviewResponseDto;
import com.ssafy.showeat.domain.review.dto.response.ReviewResponseDto;

public interface ReviewService {
	void createReview(ReviewRequestDto reviewRequestDto , HttpServletRequest request);
	FundingReviewResponseDto getReviewByFundingId(Long fundingId  ,int page);
}
