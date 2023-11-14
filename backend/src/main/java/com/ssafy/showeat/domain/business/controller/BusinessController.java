package com.ssafy.showeat.domain.business.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
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

import com.ssafy.showeat.domain.business.dto.request.AccountInfoRequestDto;
import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.business.dto.request.RegistrationRequestDto;
import com.ssafy.showeat.domain.business.dto.request.UpdateSellerInfoRequestDto;
import com.ssafy.showeat.domain.business.service.BusinessService;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.service.UserService;
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
	private final UserService userService;

	@ApiOperation(value = "사업자 인증", notes = "사업자를 인증합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사업자 인증 성공"),
		@ApiResponse(code = 400, message = "사업자 인증 실패"),
	})
	@PostMapping(value = "/registration", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseResult verifyBusiness(
		// RegistrationRequestDto로 안받아짐..
		@RequestParam("ceo") String ceo,
		@RequestParam("email") String email,
		@RequestParam("businessName") String businessName,
		@RequestParam("startDate") String startDate,
		@RequestParam("businessNumber") String businessNumber,
		@RequestParam("newBusinessAddress") String newBusinessAddress,
		@RequestParam("businessPhone") String businessPhone,
		@RequestPart("businessRegistration") MultipartFile businessRegistration,
		HttpServletRequest request
	) throws IOException {
		return new SingleResponseResult<>(businessService.verifyBusiness(RegistrationRequestDto.builder()
				.ceo(ceo)
				.email(email)
				.businessName(businessName)
				.startDate(startDate)
				.businessNumber(businessNumber)
				.newBusinessAddress(newBusinessAddress)
				.businessPhone(businessPhone)
				.build(),
			businessRegistration, userService.getUserFromRequest(request)));
	}

	@ApiOperation(value = "정산 정보 등록", notes = "정산 정보를 등록합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "정산 정보 등록 성공"),
		@ApiResponse(code = 400, message = "정산 정보 등록 실패"),
	})
	@PostMapping(value = "/account")
	public ResponseResult registerAccount(
		@RequestParam("accountHolder") String accountHolder,
		@RequestParam("accountBank") String accountBank,
		@RequestParam("accountNumber") String accountNumber,
		@RequestPart("bankBook") MultipartFile bankBook,
		HttpServletRequest request
	) throws IOException {
		businessService.registerAccount(
			AccountInfoRequestDto.builder()
				.accountHolder(accountHolder)
				.accountBank(accountBank)
				.accountNumber(accountNumber)
				.build(),
			bankBook,
			userService.getUserFromRequest(request));
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
	public ResponseResult updateBusinessImg(@RequestPart MultipartFile businessImg, HttpServletRequest request) throws
		IOException {
		String imgUrl = businessService.updateBusinessImg(businessImg, userService.getUserFromRequest(request));
		return new SingleResponseResult<>(imgUrl);
	}

	@ApiOperation(value = "셀러 소개 수정", notes = "셀러 소개를 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 소개 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 소개 수정 실패"),
	})
	@PatchMapping("/seller/bio")
	public ResponseResult updateBusinessBio(@RequestBody UpdateSellerInfoRequestDto updateSellerInfoRequestDto,
		HttpServletRequest request) {
		businessService.updateBusinessBio(updateSellerInfoRequestDto.getBusinessBio(),
			userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "셀러 운영시간 수정", notes = "셀러 운영시간을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 운영시간 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 운영시간 수정 실패"),
	})
	@PatchMapping("/seller/operating-time")
	public ResponseResult updateBusinessOperatingTime(
		@RequestBody UpdateSellerInfoRequestDto updateSellerInfoRequestDto, HttpServletRequest request) {
		businessService.updateBusinessOperatingTime(updateSellerInfoRequestDto.getOperatingTime(),
			userService.getUserFromRequest(request));
		return ResponseResult.successResponse;
	}

	@ApiOperation(value = "셀러 휴무일 수정", notes = "셀러 휴무일을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "셀러 휴무일 수정 성공"),
		@ApiResponse(code = 400, message = "셀러 휴무일 수정 실패"),
	})
	@PatchMapping("/seller/closed-days")
	public ResponseResult updateBusinessClosedDays(@RequestBody UpdateSellerInfoRequestDto updateSellerInfoRequestDto,
		HttpServletRequest request) {
		businessService.updateBusinessClosedDays(updateSellerInfoRequestDto.getBusinessClosedDays(),
			userService.getUserFromRequest(request));
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
		RegistMenuRequestDto registMenuRequestDto,
		@RequestPart(value = "multipartFiles", required = false) List<MultipartFile> multipartFiles,
		HttpServletRequest request
	) throws IOException {
		User user = userService.getUserFromRequest(request);
		businessService.registMenu(registMenuRequestDto, multipartFiles, user);
		return new ListResponseResult<>(businessService.getMenuList(user));
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
	public ResponseResult getMenuList(HttpServletRequest request) {
		return new ListResponseResult<>(businessService.getMenuList(userService.getUserFromRequest(request)));
	}

	@ApiOperation(value = "업체 메뉴 삭제", notes = "업주가 메뉴를 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "메뉴 삭제 성공"),
		@ApiResponse(code = 400, message = "메뉴 삭제 실패"),
	})
	@DeleteMapping("/menu/{menuId}")
	public ResponseResult deleteMenu(@PathVariable Long menuId, HttpServletRequest request) {
		businessService.deleteMenu(menuId, userService.getUserFromRequest(request));
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
