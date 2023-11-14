package com.ssafy.showeat.domain.notification.service;

import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;
import com.ssafy.showeat.domain.user.entity.User;

public interface NotificationService {
	NotificationListResponseDto getNotificationListByIsChecked(User user);

	boolean getNotificationExist(User user);
}
