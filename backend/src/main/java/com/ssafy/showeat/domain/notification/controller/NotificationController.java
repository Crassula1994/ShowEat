package com.ssafy.showeat.domain.notification.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.notification.service.NotificationService;
import com.ssafy.showeat.global.response.PageResponseResult;
import com.ssafy.showeat.global.response.ResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/notification")
@RestController
public class NotificationController {

	private final NotificationService notificationService;

	@ApiOperation(value = "읽지 않은 알림 리스트 조회", notes = "유저의 읽지 않은 알림 리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "읽지 않은 알림 조회 성공"),
		@ApiResponse(code = 400, message = "읽지 않은 알림 조회 실패"),
	})
	@GetMapping("/{userId}/check")
	public ResponseResult getNotificationListByIsChecked(@PathVariable Long userId, @RequestParam int page) {
		return new PageResponseResult<>(notificationService.getNotificationListByIsChecked(userId, page));
	}

}
