package com.ssafy.showeat.domain.review.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.review.dto.request.ReviewRequestDto;
import com.ssafy.showeat.domain.review.service.ReviewService;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/review")
public class ReviewController {

	private final ReviewService reviewService;

	@ApiOperation(value = "리뷰 작성" , notes = "고객이 펀딩에 대한 리뷰를 작성합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "리뷰 작성 성공"),
		@ApiResponse(code = 400, message = "리뷰 작성 실패"),
		@ApiResponse(code = 440, message = "직접 사용한 쿠폰에 한하여 리뷰가 작성 가능"),
		@ApiResponse(code = 460, message = "존재하지 않은 쿠폰"),
	})
	@PostMapping
	public ResponseResult createReview(@Valid @RequestBody ReviewRequestDto reviewRequestDto , HttpServletRequest request){
		reviewService.createReview(reviewRequestDto,request);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "리뷰 조회" , notes = "고객이 펀딩에 대한 리뷰를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "리뷰 조회 성공"),
		@ApiResponse(code = 400, message = "리뷰 조회 실패"),
	})
	@GetMapping
	public ResponseResult getReviewByFundingId(
		@RequestParam Long fundingId,
		@RequestParam int page
	){
		return new SingleResponseResult<>(reviewService.getReviewByFundingId(fundingId,page));
	}
}
