package com.ssafy.showeat.domain.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.ssafy.showeat.domain.review.entity.Review;

public interface ReviewRepositoryCustom {
	Page<Review> findReviewInFunding(Pageable pageable , Long fundingId);
	Page<Review> findReviewInBusinessId(Pageable pageable , Long businessId);
}
