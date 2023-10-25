package com.ssafy.showeat.domain.coupon.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStateRequestDto;
import com.ssafy.showeat.domain.coupon.service.CouponService;
import com.ssafy.showeat.global.response.ListResponseResult;
import com.ssafy.showeat.global.response.ResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/coupon")
@RestController
public class CouponController {

	private final CouponService couponService;

	@ApiOperation(value = "유저 쿠폰리스트 조회", notes = "유저가 쿠폰 리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "쿠폰 리스트 조회 성공"),
		@ApiResponse(code = 400, message = "쿠폰 리스트 조회 실패"),
	})
	@GetMapping("/{userId}")
	public ResponseResult getCouponListByUserId(@PathVariable Long userId) {
		log.info("CouponController_getCouponListByUserId -> 해당 유저의 쿠폰 리스트 조회");
		return new ListResponseResult<>(couponService.getCouponListByUserId(userId));
	}

	@ApiOperation(value = "쿠폰 상태 변경", notes = "쿠폰의 상태를 변경합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "쿠폰 상태 변경 성공"),
		@ApiResponse(code = 400, message = "쿠폰 상태 변경 실패"),
	})
	@PatchMapping("/couponstate")
	public ResponseResult updateCouponState(@RequestBody UpdateCouponStateRequestDto updateCouponStateRequestDto) {
		log.info("CouponController_updateCouponStateUsed -> 해당 쿠폰의 상태를 변경");
		couponService.updateCouponState(updateCouponStateRequestDto);
		return ResponseResult.successResponse;
	}

}
