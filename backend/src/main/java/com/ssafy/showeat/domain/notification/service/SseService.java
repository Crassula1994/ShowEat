package com.ssafy.showeat.domain.notification.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.showeat.domain.notification.entity.Notification;
import com.ssafy.showeat.domain.notification.repository.EmitterRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.global.exception.SseConnectException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseService {

	private final static String SSE_NAME = "sse";

	private final EmitterRepository emitterRepository;
	private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

	public void send(Long notificationId, Long receiverId) {
		log.info("SseService - send");
		emitterRepository.get(receiverId).ifPresentOrElse(it -> {
				try {
					it.send(SseEmitter.event()
						.id(notificationId.toString())
						.name(SSE_NAME)
						.data("send notification"));
				} catch (IOException exception) {
					emitterRepository.delete(receiverId);
					throw new SseConnectException();
				}
			},
			() -> log.info("No emitter founded")
		);
	}

	public SseEmitter connectNotification(Long userId) {
		SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
		emitterRepository.save(userId, emitter);
		emitter.onCompletion(() -> emitterRepository.delete(userId));
		emitter.onTimeout(() -> emitterRepository.delete(userId));

		try {
			log.info("connectNotification - send");
			emitter.send(SseEmitter.event()
				.id("id")
				.name(SSE_NAME)
				.data("connect completed"));
		} catch (IOException exception) {
			throw new SseConnectException();
		}
		return emitter;
	}

}
