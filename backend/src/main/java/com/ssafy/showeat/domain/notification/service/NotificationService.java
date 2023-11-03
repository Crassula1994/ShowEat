package com.ssafy.showeat.domain.notification.service;

import org.springframework.data.domain.Page;

import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;

public interface NotificationService {
	Page<NotificationListResponseDto> getNotificationListByIsChecked(Long userId, int page);
}
