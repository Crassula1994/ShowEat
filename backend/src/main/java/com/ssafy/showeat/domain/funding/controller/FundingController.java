package com.ssafy.showeat.domain.funding.controller;

import java.io.IOException;
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

import com.google.zxing.WriterException;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.service.FundingService;
import com.ssafy.showeat.domain.user.service.UserService;
import com.ssafy.showeat.global.response.ListResponseResult;
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
		@ApiResponse(code = 451, message = "업주가 아닌 사람은 펀딩을 생성할 수 없음")
	})
	@PostMapping
	public ResponseResult createFunding(@Valid @RequestBody CreateFundingRequestDto createFundingRequestDto ,
		HttpServletRequest request
	){
		Long fundingId = fundingService.createFunding(createFundingRequestDto, userService.getUserFromRequest(request));
		return new SingleResponseResult<>(fundingId);
	}

	@ApiOperation(value = "금액권 펀딩에 이미지 추가" , notes = "금액권 펀딩에 이미지 추가합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "금액권 펀딩에 이미지 추가 성공"),
		@ApiResponse(code = 400, message = "금액권 펀딩에 이미지 추가 실패"),
		@ApiResponse(code = 451, message = "업주가 아닌 사람은 펀딩에 이미지 추가할 수 없음")
	})
	@PostMapping("/image/{fundingId}")
	public ResponseResult addImageToFunding(@PathVariable Long fundingId ,
		@RequestPart(value = "multipartFile" , required = false) MultipartFile multipartFile,
		HttpServletRequest request
	) throws IOException {
		fundingService.addImageToFunding(fundingId,multipartFile,userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}


	@ApiOperation(value = "펀딩 조회" , notes = "펀딩을 상세 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 조회 실패"),
		@ApiResponse(code = 452, message = "해당 펀딩이 존재하지 않음"),
	})
	@GetMapping("/{fundingId}")
	public ResponseResult getFunding(@PathVariable Long fundingId){
		return new SingleResponseResult<>(fundingService.getFunding(fundingId));
	}

	@ApiOperation(value = "펀딩 참여" , notes = "펀딩에 참여합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 참여 성공"),
		@ApiResponse(code = 400, message = "펀딩 참여 실패"),
		@ApiResponse(code = 452, message = "해당 펀딩이 존재하지 않음"),
		@ApiResponse(code = 481, message = "해당 펀딩은 이미 종료되었음"),
		@ApiResponse(code = 482, message = "해당 펀딩의 참여가능한 자리가 없음"),
		@ApiResponse(code = 483, message = "해당 펀딩에 중복참여 불가능"),
		@ApiResponse(code = 484, message = "해당 펀딩에 참여할 포인트 부족"),
	})
	@PostMapping("/user/{fundingId}")
	public ResponseResult applyFunding(@PathVariable Long fundingId , HttpServletRequest request) throws
		IOException,
		WriterException {
		fundingService.applyFunding(fundingId,userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "펀딩 참여 취소" , notes = "펀딩 참여를 취소 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 참여 취소 성공"),
		@ApiResponse(code = 400, message = "펀딩 참여 취소 실패"),
		@ApiResponse(code = 452, message = "해당 펀딩이 존재하지 않음"),
		@ApiResponse(code = 485, message = "참여하지 않은 펀딩에 대해 취소 불가능"),
	})
	@DeleteMapping("/user/{fundingId}")
	public ResponseResult cancelFunding(@PathVariable Long fundingId , HttpServletRequest request){
		fundingService.cancelFunding(fundingId,userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "업주의 업체 펀딩 목록 조회", notes = "업주가 업체의 펀딩 목록을 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 목록 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 목록 조회 실패"),
	})
	@GetMapping("/business/{page}/{state}")
	public ResponseResult getFundingList(
		@PathVariable String state,
		@PathVariable int page,
		HttpServletRequest request
	) {
		return new PageResponseResult<>(fundingService.getFundingList(FundingIsActive.valueOf(state), page , userService.getUserFromRequest(request)));
	}

	@ApiOperation(value = "업체의 펀딩 목록 조회", notes = "업체의 펀딩 목록을 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 목록 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 목록 조회 실패"),
	})
	@GetMapping("/business/active/{businessId}")
	public ResponseResult getBusinessFundingList(
		@PathVariable Long businessId
	) {
		return new ListResponseResult<>(fundingService.getBusinessFundingList(businessId));
	}

	@ApiOperation(value = "사용자 참여 펀딩 조회", notes = "사용자가 자신이 참여한 펀딩을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사용자 참여 펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "사용자 참여 펀딩 조회 실패"),
		@ApiResponse(code = 486, message = "해당 페이지는 조회할 정보가 없음"),
	})
	@GetMapping("/user/{page}")
	public ResponseResult getUserFundings(HttpServletRequest request, @PathVariable int page) {
		log.info("FundingController_getUserFundings");
		return new PageResponseResult<>(fundingService.getUserFundingList(userService.getUserFromRequest(request),page));
	}

	@ApiOperation(value = "사용자 좋아요 펀딩 조회", notes = "사용자가 자신이 좋아요한 펀딩을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사용자 좋아요 펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "사용자 좋아요 펀딩 조회 실패"),
		@ApiResponse(code = 486, message = "해당 페이지는 조회할 정보가 없음"),
	})
	@GetMapping("/user/bookmark/{page}")
	public ResponseResult getUserFundingsByBookmark(HttpServletRequest request, @PathVariable int page) {
		log.info("FundingController_getUserFundingsByBookmark");
		return new PageResponseResult<>(fundingService.getUserFundingListByBookmark(userService.getUserFromRequest(request),page));
	}

	@ApiOperation(value = "펀딩 검색", notes = "필터링을 한 후 펀딩 검색을 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 검색 성공"),
		@ApiResponse(code = 400, message = "펀딩 검색 실패"),
		@ApiResponse(code = 410, message = "유효하지 않은 검색 조건"),
		@ApiResponse(code = 411, message = "유효하지 않은 정렬 조건"),
		@ApiResponse(code = 412, message = "유효하지 않은 카테고리 조건"),
		@ApiResponse(code = 413, message = "검색어를 입력하지 않음"),
		@ApiResponse(code = 486, message = "해당 페이지는 조회할 정보가 없음"),
	})
	@GetMapping
	public ResponseResult searchFunding(SearchFundingRequestDto searchFundingRequestDto) {
		log.info("FundingController_searchFunding");
		return new PageResponseResult<>(fundingService.searchFunding(searchFundingRequestDto));
	}

	@ApiOperation(value = "종류별 펀딩 조회", notes = "홈화면에 보여줄 종류별 펀딩 조회")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 조회 실패"),
		@ApiResponse(code = 411, message = "유효하지 않은 종류(type)"),
	})
	@GetMapping("/home")
	public ResponseResult getFundingInHome(@RequestParam String type) {
		log.info("FundingController_getFundingInHome");
		return new ListResponseResult<>(fundingService.getFundingByType(type));
	}

	@ApiOperation(value = "카테고리별 펀딩 조회", notes = "홈화면에 보여줄 종류별 펀딩 조회")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 조회 성공"),
		@ApiResponse(code = 400, message = "펀딩 조회 실패"),
		@ApiResponse(code = 486, message = "해당 페이지는 조회할 정보가 없음"),
	})
	@GetMapping("/home/category")
	public ResponseResult getFundingInHomeByCategory(
		@RequestParam String category,
		@RequestParam String sortType,
		@RequestParam int page
		) {
		log.info("FundingController_getFundingInHomeByCategory");
		return new PageResponseResult<>(fundingService.getFundingByCategory(category,sortType,page));
	}

	@ApiOperation(value = "유저의 펀딩 참여여부,찜 여부 조회" , notes = "유저의 펀딩 참여여부,찜 여부 조회 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "조회 성공"),
		@ApiResponse(code = 400, message = "조회 실패"),

	})
	@GetMapping("/{fundingId}/user/{userId}")
	public ResponseResult getUserFundingIsZzimAndIsParticipate(@PathVariable Long fundingId, @PathVariable Long userId){
		return new SingleResponseResult<>(fundingService.getUserFundingIsZzimAndIsParticipate(fundingId,userId));
	}

}
