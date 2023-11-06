package com.ssafy.showeat.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

	private static final String TOPIC_NAME = "sse";

	private final KafkaTemplate<String, SseDto> kafkaTemplate;

	public void send(SseDto message) {
		ListenableFuture<SendResult<String, SseDto>> future = kafkaTemplate.send(TOPIC_NAME, message);
	}
}
