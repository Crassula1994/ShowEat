package com.ssafy.showeat.domain.coupon.service;

import java.util.List;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStateRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;

public interface CouponService {
	List<CouponResponseDto> getCouponListByUserId(Long userId);

	void updateCouponState(UpdateCouponStateRequestDto updateCouponStateRequestDto);
}
