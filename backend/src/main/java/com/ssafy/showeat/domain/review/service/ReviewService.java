package com.ssafy.showeat.domain.review.service;

import com.ssafy.showeat.domain.review.dto.request.ReviewRequestDto;

public interface ReviewService {
	void createReview(ReviewRequestDto reviewRequestDto);
}
