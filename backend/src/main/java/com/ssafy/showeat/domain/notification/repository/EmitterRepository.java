package com.ssafy.showeat.domain.notification.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EmitterRepository {

	private Map<String, SseEmitter> emitterMap = new HashMap<>();

	public SseEmitter save(Long userId, SseEmitter emitter) {
		final String key = getKey(userId);
		log.info("Set Emitter {}({})", key, emitter);
		emitterMap.put(key, emitter);
		return emitter;
	}

	public void delete(Long userId) {
		emitterMap.remove(getKey(userId));
	}

	public Optional<SseEmitter> get(Long userId) {
		SseEmitter result = emitterMap.get(getKey(userId));
		log.info("Get Emitter {}", result);
		return Optional.ofNullable(result);
	}

	private String getKey(Long userId) {
		return "emitter:UID:" + userId;
	}

}
