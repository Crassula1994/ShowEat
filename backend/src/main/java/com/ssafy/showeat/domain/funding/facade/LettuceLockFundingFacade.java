package com.ssafy.showeat.domain.funding.facade;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.google.zxing.WriterException;
import com.ssafy.showeat.domain.funding.repository.RedisLockFundingRepository;
import com.ssafy.showeat.domain.funding.service.FundingService;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LettuceLockFundingFacade {

	private final FundingService fundingService;
	private final RedisLockFundingRepository redisLockFundingRepository;

	public void applyFunding(Long fundingId, User user) throws InterruptedException, IOException, WriterException {
		while (!redisLockFundingRepository.lock(fundingId.toString())) {
			Thread.sleep(100);
		}

		try {
			fundingService.applyFunding(fundingId, user);
		} finally {
			redisLockFundingRepository.unlock(fundingId.toString());
		}
	}

}
