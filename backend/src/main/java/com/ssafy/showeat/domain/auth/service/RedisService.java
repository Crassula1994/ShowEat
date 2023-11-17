package com.ssafy.showeat.domain.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate<String, String> redisTemplate;

	public String getValues(String key) {
		ValueOperations<String, String> values = redisTemplate.opsForValue();
		return values.get(key);
	}

	public void setValues(String key, String value) {
		redisTemplate.opsForValue().set(key, value);
		redisTemplate.expire(key, 14, TimeUnit.DAYS);
	}

	public void delValues(String key){
		redisTemplate.delete(key+"_refreshToken");
	}
}