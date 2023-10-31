package com.ssafy.showeat.domain.funding.repository;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisLockFundingRepository {

	private final RedisTemplate<String, String> redisTemplate;

	public Boolean lock(String key) {
		return redisTemplate
			.opsForValue()
			.setIfAbsent(generateKey(key), "lock", Duration.ofMillis(3_000));
	}

	public Boolean unlock(String key) {
		return redisTemplate.delete(generateKey(key));
	}

	private String generateKey(String key) {
		return key.toString();
	}
}
