package com.ssafy.showeat.domain.notification.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.showeat.domain.notification.service.NotificationService;
import com.ssafy.showeat.domain.notification.service.SseService;
import com.ssafy.showeat.domain.user.service.UserService;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;

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

	private final SseService sseService;
	private final UserService userService;
	private final NotificationService notificationService;

	@ApiOperation(value = "읽지 않은 알림 리스트 조회", notes = "유저의 읽지 않은 알림 리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "읽지 않은 알림 조회 성공"),
		@ApiResponse(code = 400, message = "읽지 않은 알림 조회 실패"),
	})
	@GetMapping
	public ResponseResult getNotificationListByIsChecked(HttpServletRequest request) {
		return new SingleResponseResult<>(
			notificationService.getNotificationListByIsChecked(userService.getUserFromRequest(request)));
	}

	@ApiOperation(value = "읽지 않은 알림 여부 조회", notes = "유저의 읽지 않은 알림 여부를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "읽지 않은 알림 여부 조회 성공"),
		@ApiResponse(code = 400, message = "읽지 않은 알림 여부 조회 실패"),
	})
	@GetMapping("/exist")
	public ResponseResult getNotificationExist(HttpServletRequest request) {
		return new SingleResponseResult<>(
			notificationService.getNotificationExist(userService.getUserFromRequest(request)));
	}

	@GetMapping(value = "/subscribe")
	public SseEmitter subscribe(HttpServletRequest request) {
		return sseService.connectNotification(userService.getUserFromRequest(request).getUserId());
	}
}
