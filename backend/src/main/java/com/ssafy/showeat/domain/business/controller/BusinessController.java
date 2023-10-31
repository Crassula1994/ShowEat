package com.ssafy.showeat.domain.business.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.BusinessUserRequestDto;
import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.business.service.BusinessService;
import com.ssafy.showeat.global.response.ListResponseResult;
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
@RequestMapping(value = "/api/business")
public class BusinessController {

	private final BusinessService businessService;

	@ApiOperation(value = "업체 등록", notes = "업체를 등록합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "업체 등록 성공"),
		@ApiResponse(code = 400, message = "업체 등록 실패"),
	})
	@PostMapping
	public ResponseResult registerBusinessUser(
		@RequestPart BusinessUserRequestDto businessUserRequestDto,
		@RequestPart MultipartFile businessRegistration,
		@RequestPart MultipartFile bankBook
	) throws IOException {
		businessService.registerBusinessUser(businessUserRequestDto, businessRegistration, bankBook);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "셀러 정보 조회", notes = "셀러 정보를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 조회 성공"),
		@ApiResponse(code = 400, message = "셀러 조회 실패"),
	})
	@GetMapping("/seller/{businessId}")
	public ResponseResult getSellerInfo(@PathVariable Long businessId) {
		return new SingleResponseResult<>(businessService.getSellerInfo(businessId));
	}

	@ApiOperation(value = "셀러 프로필 수정", notes = "셀러 프로필을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 프로필 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 프로필 수정 실패"),
	})
	@PatchMapping("/seller/profile")
	public ResponseResult updateBusinessImg(@RequestPart MultipartFile businessImg) throws IOException {
		businessService.updateBusinessImg(businessImg);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "셀러 소개 수정", notes = "셀러 소개를 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 소개 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 소개 수정 실패"),
	})
	@PatchMapping("/seller/bio")
	public ResponseResult updateBusinessBio(@RequestBody String businessBio) {
		businessService.updateBusinessBio(businessBio);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "셀러 운영시간 수정", notes = "셀러 운영시간을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 운영시간 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 운영시간 수정 실패"),
	})
	@PatchMapping("/seller/operating-time")
	public ResponseResult updateBusinessOperatingTime(@RequestBody String operatingTime) {
		businessService.updateBusinessOperatingTime(operatingTime);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "셀러 휴무일 수정", notes = "셀러 휴무일을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 휴무일 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 휴무일 수정 실패"),
	})
	@PatchMapping("/seller/closed-days")
	public ResponseResult updateBusinessClosedDays(@RequestBody String businessClosedDays) {
		businessService.updateBusinessClosedDays(businessClosedDays);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "사업자 정보 조회", notes = "사업자 정보를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사업자 조회 성공"),
		@ApiResponse(code = 400, message = "사업자 조회 실패"),
	})
	@GetMapping("/registration/{businessId}")
	public ResponseResult getRegistrationInfo(@PathVariable Long businessId) {
		return new SingleResponseResult<>(businessService.getRegistrationInfo(businessId));
	}

	@ApiOperation(value = "업체 메뉴 등록", notes = "업주가 메뉴를 등록합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "메뉴 등록 성공"),
		@ApiResponse(code = 400, message = "메뉴 등록 실패"),
	})
	@PostMapping("/menu")
	public ResponseResult registMenu(
		@RequestPart RegistMenuRequestDto registMenuRequestDto,
		@RequestPart List<MultipartFile> multipartFiles
	) throws IOException {
		businessService.registMenu(registMenuRequestDto, multipartFiles);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "업체 메뉴 조회", notes = "업주가 메뉴를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "메뉴 조회 성공"),
		@ApiResponse(code = 400, message = "메뉴 조회 실패"),
	})
	@GetMapping("/menu/{menuId}")
	public ResponseResult getMenuInfo(@PathVariable Long menuId) {
		return new SingleResponseResult<>(businessService.getMenuInfo(menuId));
	}

	@ApiOperation(value = "업체 메뉴 리스트 조회", notes = "업주가 업체의 메뉴리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "메뉴 조회 성공"),
		@ApiResponse(code = 400, message = "메뉴 조회 실패"),
	})
	@GetMapping("/menu")
	public ResponseResult getMenuList() {
		return new ListResponseResult<>(businessService.getMenuList());
	}

	@ApiOperation(value = "업체 메뉴 삭제", notes = "업주가 메뉴를 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "메뉴 삭제 성공"),
		@ApiResponse(code = 400, message = "메뉴 삭제 실패"),
	})
	@DeleteMapping("/menu/{menuId}")
	public ResponseResult deleteMenu(@PathVariable Long menuId) {
		businessService.deleteMenu(menuId);
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "월간 통계 조회", notes = "업주가 업체의 월간 통계를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "월간 통계 조회 성공"),
		@ApiResponse(code = 400, message = "월간 통계 조회 실패"),
	})
	@GetMapping("/stat/monthly/{businessId}")
	public ResponseResult getMonthlyStatistic(@PathVariable Long businessId) {
		return new ListResponseResult<>(businessService.getMonthlyStatistic(businessId));
	}

	@ApiOperation(value = "누적 통계 조회", notes = "업주가 업체의 누적 통계를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "누적 통계 조회 성공"),
		@ApiResponse(code = 400, message = "누적 통계 조회 실패"),
	})
	@GetMapping("/stat/total/{businessId}")
	public ResponseResult getTotalStatistic(@PathVariable Long businessId) {
		return new SingleResponseResult<>(businessService.getTotalStatistic(businessId));
	}
}
