package com.ssafy.showeat.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

	private static final String TOPIC_NAME = "sse";

	private final KafkaTemplate<String, SseDto> kafkaTemplate;

	public void send(SseDto message) {
		kafkaTemplate.send(TOPIC_NAME, message);
	}
}
