package com.ssafy.showeat.domain.review.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponState;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.review.dto.request.ReviewRequestDto;
import com.ssafy.showeat.domain.review.repository.ReviewRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.ImpossibleReviewException;
import com.ssafy.showeat.global.exception.NotExistCouponException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

	private final ReviewRepository reviewRepository;
	private final CouponRepository couponRepository;
	private final UserRepository userRepository;

	@Override
	@Transactional
	public void createReview(ReviewRequestDto reviewRequestDto) {
		log.info("ReviewServiceImpl_createReview || 리뷰 작성");

		Long userId = 1l;
		User loginUser = userRepository.findById(userId).get();
		Coupon coupon = couponRepository.findById(reviewRequestDto.getCouponId())
			.orElseThrow(NotExistCouponException::new);

		if(!CouponState.USED.equals(coupon.getCouponState()))
			throw new ImpossibleReviewException();

		reviewRepository.save(reviewRequestDto.toEntity(loginUser,coupon.getFunding()));
	}
}
