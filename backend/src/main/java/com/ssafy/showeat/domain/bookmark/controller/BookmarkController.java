package com.ssafy.showeat.domain.bookmark.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.bookmark.service.BookmarkService;
import com.ssafy.showeat.global.response.ResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/bookmark")
public class BookmarkController {

	private final BookmarkService bookmarkService;

	@ApiOperation(value = "관심 펀딩 추가/삭제" , notes = "관심 펀딩을 추가/삭제 합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "관심 펀딩 추가/삭제 성공"),
		@ApiResponse(code = 400, message = "관심 펀딩 추가/삭제 실패"),
	})
	@PostMapping("/{fundingId}")
	public ResponseResult addBookmark(@PathVariable Long fundingId , HttpServletRequest request){
		bookmarkService.addBookmark(fundingId,request);
		return ResponseResult.successResponse;
	}
}
