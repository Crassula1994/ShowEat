package com.ssafy.showeat.domain.notification.service;

import java.io.IOException;
import java.util.List;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;
import com.ssafy.showeat.domain.user.entity.User;

public interface NotificationService {
	NotificationListResponseDto getNotificationListByIsChecked(User user);

	boolean getNotificationExist(User user);

	void createNotification(List<Coupon> coupons) throws IOException;
}
