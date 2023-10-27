package com.ssafy.showeat.domain.funding.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.service.FundingService;
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
@RequestMapping(value = "/api/funding")
public class FundingController {

	private final FundingService fundingService;

	@ApiOperation(value = "펀딩 생성" , notes = "업주가 펀딩을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 생성 성공"),
		@ApiResponse(code = 400, message = "펀딩 생성 실패"),
	})
	@PostMapping
	public ResponseResult createFunding(@Valid @RequestBody CreateFundingRequestDto createFundingRequestDto ,
		HttpServletRequest request
	){
		fundingService.createFunding(createFundingRequestDto , request);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "펀딩 조회" , notes = "펀딩을 상세 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 조회 실패"),
	})
	@GetMapping("/{fundingId}")
	public ResponseResult getFunding(@PathVariable Long fundingId , HttpServletRequest request){
		return new SingleResponseResult<>(fundingService.getFunding(fundingId,request));
	}

	@ApiOperation(value = "펀딩 참여" , notes = "펀딩에 참여합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 참여 성공"),
		@ApiResponse(code = 400, message = "펀딩 참여 실패"),
	})
	@PostMapping("/user/{fundingId}")
	public ResponseResult applyFunding(@PathVariable Long fundingId , HttpServletRequest request){
		fundingService.applyFunding(fundingId,request);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "펀딩 참여 취소" , notes = "펀딩 참여를 취소 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 참여 취소 성공"),
		@ApiResponse(code = 400, message = "펀딩 참여 취소 실패"),
	})
	@DeleteMapping("/user/{fundingId}")
	public ResponseResult cancelFunding(@PathVariable Long fundingId , HttpServletRequest request){
		fundingService.cancelFunding(fundingId,request);
		return ResponseResult.successResponse;
	}
}
