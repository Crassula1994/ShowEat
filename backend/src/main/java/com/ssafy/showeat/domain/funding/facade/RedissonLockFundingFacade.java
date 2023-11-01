package com.ssafy.showeat.domain.funding.facade;

import java.util.concurrent.TimeUnit;

// import org.redisson.api.RLock;
// import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Component;

import com.ssafy.showeat.domain.funding.service.FundingService;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// @Slf4j
// @Component
// @RequiredArgsConstructor
// public class RedissonLockFundingFacade {
//
// 	private final FundingService fundingService;
// 	private final RedissonClient redissonClient;
//
// 	public void applyFunding(Long fundingId, User user) throws InterruptedException {
// 		RLock lock = redissonClient.getLock(fundingId.toString());
//
// 		try {
// 			boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);
//
// 			if (!available) {
// 				log.info("Lock 획득 실패");
// 				return;
// 			}
//
// 			fundingService.applyFunding(fundingId, user);
// 		} catch (InterruptedException e) {
// 			throw new RuntimeException(e);
// 		} finally {
// 			lock.unlock();
// 		}
// 	}
//
// }
