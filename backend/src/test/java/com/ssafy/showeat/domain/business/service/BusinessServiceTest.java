package com.ssafy.showeat.domain.business.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class BusinessServiceTest {
	@InjectMocks
	private BusinessServiceImpl businessService;

	@Mock
	private FundingRepository fundingRepository;

	@Test
	public void testGetMonthlyStatList() {

	}
}
