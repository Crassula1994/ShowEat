package com.ssafy.showeat.domain.notification.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;
import com.ssafy.showeat.domain.notification.repository.NotificationRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.NotExistUserException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService {

	private final NotificationRepository notificationRepository;
	private final UserRepository userRepository;

	@Transactional
	public Page<NotificationListResponseDto> getNotificationListByIsChecked(Long userId, int page) {
		log.info("NotificationService_getNotificationListByIsChecked || 유저가 읽지 않은 알림 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);

		// 읽지 않은 알람 조회
		Page<NotificationListResponseDto> notificationListResponseDtos = notificationRepository
			.findNotificationWithFundingByUserAndNotificationIsChecked(user, false, PageRequest.of(page, 6))
			.map(notification -> notification.toNotificationListResponseDto());

		// 읽지 않은 알람 읽음 처리
		notificationRepository.updateCheckedState(user);

		return notificationListResponseDtos;
	}

}
