package com.ssafy.showeat.domain.coupon.service;

import java.util.List;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;

public interface CouponService {
	List<CouponResponseDto> getActiveCouponListByUserId(Long userId);

	List<CouponResponseDto> getUsedCouponListByUserId(Long userId);

	List<CouponResponseDto> getExpiredCouponListByUserId(Long userId);

	CouponResponseDto getCouponDetailByCouponId(Long couponId);

	void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto);
}
