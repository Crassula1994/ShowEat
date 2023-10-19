package com.ssafy.showeat.domain.coupon.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.coupon.service.CouponService;
import com.ssafy.showeat.global.response.ListResponseResult;
import com.ssafy.showeat.global.response.ResponseResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/coupon")
@RestController
public class CouponController {

	private final CouponService couponService;

	@GetMapping("/{userId}")
	public ResponseResult getCouponListByUserId(@PathVariable Long userId) {
		log.info("CouponController_getCouponListByUserId - 해당 유저의 쿠폰 리스트 조회");
		return new ListResponseResult<>(couponService.getCouponListByUserId(userId));
	}
}
