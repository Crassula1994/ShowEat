package com.ssafy.showeat.domain.review.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.showeat.domain.coupon.entity.CouponStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.review.dto.request.ReviewRequestDto;
import com.ssafy.showeat.domain.review.dto.response.FundingReviewResponseDto;
import com.ssafy.showeat.domain.review.dto.response.ReviewResponseDto;
import com.ssafy.showeat.domain.review.entity.Review;
import com.ssafy.showeat.domain.review.repository.ReviewRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.domain.user.service.UserService;
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
	private final UserService userService;

	@Override
	@Transactional
	public void createReview(ReviewRequestDto reviewRequestDto , HttpServletRequest request) {
		log.info("ReviewServiceImpl_createReview || 리뷰 작성");

		User loginUser = userService.getUserFromRequest(request);
		Coupon coupon = couponRepository.findById(reviewRequestDto.getCouponId())
			.orElseThrow(NotExistCouponException::new);

		if(!CouponStatus.USED.equals(coupon.getCouponStatus()))
			throw new ImpossibleReviewException();

		reviewRepository.save(reviewRequestDto.toEntity(loginUser,coupon.getFunding()));
	}

	@Override
	public FundingReviewResponseDto getReviewByFundingId(Long fundingId , int page) {
		log.info("ReviewServiceImpl_getReviewByFundingId || 리뷰 조회");
		Page<Review> reviewInFunding = reviewRepository.findReviewInFunding(PageRequest.of(page, 5), fundingId);
		return FundingReviewResponseDto.createFundingReviewResponseDto(reviewInFunding);
	}
}
