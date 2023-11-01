package com.ssafy.showeat.domain.coupon.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponPriceRequestDto;
import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.coupon.service.CouponService;
import com.ssafy.showeat.global.response.ListResponseResult;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;

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

	@ApiOperation(value = "상태별 쿠폰 리스트 조회", notes = "유저의 상태별 쿠폰 리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "상태별 쿠폰 리스트 조회 성공"),
		@ApiResponse(code = 400, message = "상태별 쿠폰 리스트 조회 실패"),
	})
	@GetMapping("/{userId}/{status}")
	public ResponseResult getCouponListByUserIdAndStatus(@PathVariable Long userId, @PathVariable CouponStatus status) {
		return new ListResponseResult<>(couponService.getCouponListByUserIdAndStatus(userId, status));
	}

	@ApiOperation(value = "쿠폰 상세 조회", notes = "쿠폰의 상세정보를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "쿠폰 상세 조회 성공"),
		@ApiResponse(code = 400, message = "쿠폰 상세 조회 실패"),
	})
	@GetMapping("/{couponId}")
	public ResponseResult getCouponDetailByCouponId(@PathVariable Long couponId) {
		return new SingleResponseResult<>(couponService.getCouponDetailByCouponId(couponId));
	}

	@ApiOperation(value = "쿠폰 상태 변경", notes = "쿠폰의 상태를 변경합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "쿠폰 상태 변경 성공"),
		@ApiResponse(code = 400, message = "쿠폰 상태 변경 실패"),
	})
	@PatchMapping("/update/status")
	public ResponseResult updateCouponStatus(@RequestBody UpdateCouponStatusRequestDto updateCouponStatusRequestDto) {
		couponService.updateCouponStatus(updateCouponStatusRequestDto);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "쿠폰 금액 차감", notes = "쿠폰의 금액을 차감합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "쿠폰 금액 차감 성공"),
		@ApiResponse(code = 400, message = "쿠폰 금액 차감 실패"),
	})
	@PatchMapping("/update/price")
	public ResponseResult updateCouponPrice(@RequestBody UpdateCouponPriceRequestDto updateCouponPriceRequestDto) {
		couponService.updateCouponPrice(updateCouponPriceRequestDto);
		return ResponseResult.successResponse;
	}
}
