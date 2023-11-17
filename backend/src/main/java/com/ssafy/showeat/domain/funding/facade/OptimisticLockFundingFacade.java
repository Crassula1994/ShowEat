package com.ssafy.showeat.domain.funding.facade;

import org.springframework.stereotype.Component;

import com.ssafy.showeat.domain.funding.service.FundingService;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OptimisticLockFundingFacade {

	private final FundingService fundingService;

	public void applyFunding(Long fundingId, User user) throws InterruptedException {
		while (true) {
			try {
				fundingService.applyFunding(fundingId, user);

				break;
			} catch (Exception e) {
				Thread.sleep(50);
			}
		}
	}
}
