package com.ssafy.showeat.domain.business.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.business.service.BusinessService;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.global.response.ResponseResult;

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

	@ApiOperation(value = "업체 메뉴 등록" , notes = "업주가 메뉴를 등록합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "메뉴 등록 성공"),
		@ApiResponse(code = 400, message = "메뉴 등록 실패"),
	})
	@PostMapping("/menu")
	public ResponseResult registMenu(
		@RequestPart RegistMenuRequestDto registMenuRequestDto,
		@RequestPart List<MultipartFile> multipartFiles
	) throws IOException {
		businessService.registMenu(registMenuRequestDto,multipartFiles);
		return ResponseResult.successResponse;
	}
}
