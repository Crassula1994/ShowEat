package com.ssafy.showeat.domain.funding.facade;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.funding.repository.LockRepository;
import com.ssafy.showeat.domain.funding.service.FundingService;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NamedLockFundingFacade {

	private final LockRepository lockRepository;
	private final FundingService fundingService;

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void applyFunding(Long fundingId, User user) {
		try {
			lockRepository.getLock(fundingId.toString());
			fundingService.applyFunding(fundingId, user);
		} finally {
			lockRepository.releaseLock(fundingId.toString());
		}
	}
}
