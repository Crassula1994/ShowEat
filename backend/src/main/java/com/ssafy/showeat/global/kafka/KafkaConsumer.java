package com.ssafy.showeat.global.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.showeat.domain.notification.dto.response.SseDto;
import com.ssafy.showeat.domain.notification.service.SseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {

	private static final String TOPIC_NAME = "sse";
	private final ObjectMapper objectMapper = new ObjectMapper();
	private final SseService sseService;

	@KafkaListener(topics = TOPIC_NAME)
	public void listenMessage(String jsonMessage) {
		try {
			SseDto message = objectMapper.readValue(jsonMessage, SseDto.class);
			sseService.send(message.getNotificationId(), message.getUserId());
			log.info(">>> UserId {}, NotificationId {}", message.getUserId(), message.getNotificationId());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
