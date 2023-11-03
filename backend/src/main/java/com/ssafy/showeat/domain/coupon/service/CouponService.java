package com.ssafy.showeat.domain.coupon.service;

import java.util.List;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponPriceRequestDto;
import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponDetailResponseDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponListResponseDto;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.funding.entity.Funding;

public interface CouponService {
	List<CouponListResponseDto> getCouponListByUserIdAndStatus(Long userId, CouponStatus status);

	CouponDetailResponseDto getCouponDetailByCouponId(Long couponId);

	void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto);

	void updateCouponPrice(UpdateCouponPriceRequestDto updateCouponPriceRequestDto);

	void createCoupon(Funding funding);
}
