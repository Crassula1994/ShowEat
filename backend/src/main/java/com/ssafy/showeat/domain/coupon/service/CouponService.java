package com.ssafy.showeat.domain.coupon.service;

import java.util.List;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponPriceRequestDto;
import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponPageResponseDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface CouponService {
	CouponPageResponseDto getCouponListByUserIdAndStatus(Long userId, CouponStatus status, int page);

	CouponResponseDto getCouponDetailByCouponId(Long couponId);

	void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto);

	void updateCouponPrice(UpdateCouponPriceRequestDto updateCouponPriceRequestDto , User user);
	void updateCouponStatusByOwner(Long couponId , User user);
	List<Coupon> createCoupon(Funding funding);
}
