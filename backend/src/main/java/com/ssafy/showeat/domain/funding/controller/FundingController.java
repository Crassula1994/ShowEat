package com.ssafy.showeat.domain.funding.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.service.FundingService;
import com.ssafy.showeat.domain.user.service.UserService;
import com.ssafy.showeat.global.response.PageResponseResult;
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
	private final UserService userService;

	@ApiOperation(value = "펀딩 생성" , notes = "업주가 펀딩을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 생성 성공"),
		@ApiResponse(code = 400, message = "펀딩 생성 실패"),
	})
	@PostMapping
	public ResponseResult createFunding(@Valid @RequestBody CreateFundingRequestDto createFundingRequestDto ,
		HttpServletRequest request
	){
		fundingService.createFunding(createFundingRequestDto , userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "펀딩 조회" , notes = "펀딩을 상세 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 조회 실패"),
	})
	@GetMapping("/{fundingId}")
	public ResponseResult getFunding(@PathVariable Long fundingId , HttpServletRequest request){
		return new SingleResponseResult<>(fundingService.getFunding(fundingId,userService.getUserFromRequest(request)));
	}

	@ApiOperation(value = "펀딩 참여" , notes = "펀딩에 참여합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 참여 성공"),
		@ApiResponse(code = 400, message = "펀딩 참여 실패"),
	})
	@PostMapping("/user/{fundingId}")
	public ResponseResult applyFunding(@PathVariable Long fundingId , HttpServletRequest request){
		fundingService.applyFunding(fundingId,userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "펀딩 참여 취소" , notes = "펀딩 참여를 취소 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 참여 취소 성공"),
		@ApiResponse(code = 400, message = "펀딩 참여 취소 실패"),
	})
	@DeleteMapping("/user/{fundingId}")
	public ResponseResult cancelFunding(@PathVariable Long fundingId , HttpServletRequest request){
		fundingService.cancelFunding(fundingId,userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "펀딩 목록 조회", notes = "펀딩 목록을 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 목록 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 목록 조회 실패"),
	})
	@GetMapping("/business/{businessId}")
	public ResponseResult getFundingList(
		HttpServletRequest request,
		@PathVariable Long businessId,
		FundingIsActive state,
		@RequestParam int page
	) {
		return new PageResponseResult<>(fundingService.getFundingList(businessId, state, page, userService.getUserFromRequest(request)));
	}

	@ApiOperation(value = "사용자 참여 펀딩 조회", notes = "사용자가 자신이 참여한 펀딩을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사용자 참여 펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "사용자 참여 펀딩 조회 실패"),
	})
	@GetMapping("/user")
	public ResponseResult getUserFundings(HttpServletRequest request, @RequestParam int page) {
		log.info("FundingController_getUserFundings");
		return new PageResponseResult<>(fundingService.getUserFundingList(userService.getUserFromRequest(request),page));
	}

	@ApiOperation(value = "사용자 좋아요 펀딩 조회", notes = "사용자가 자신이 좋아요한 펀딩을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사용자 좋아요 펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "사용자 좋아요 펀딩 조회 실패"),
	})
	@GetMapping("/user/bookmark")
	public ResponseResult getUserFundingsByBookmark(HttpServletRequest request, @RequestParam int page) {
		log.info("FundingController_getUserFundingsByBookmark");
		return new PageResponseResult<>(fundingService.getUserFundingListByBookmark(userService.getUserFromRequest(request),page));
	}

	@ApiOperation(value = "펀딩 검색", notes = "필터링을 한 후 펀딩 검색을 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 검색 성공"),
		@ApiResponse(code = 400, message = "펀딩 검색 실패"),
	})
	@GetMapping
	public ResponseResult searchFunding(SearchFundingRequestDto searchFundingRequestDto , HttpServletRequest request) {
		log.info("FundingController_searchFunding");
		return new PageResponseResult<>(fundingService.searchFunding(searchFundingRequestDto,userService.getUserFromRequest(request)));
	}


}
