package com.ssafy.showeat.domain.funding.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

@DataJpaTest
public class FundingRepositoryTest {

	@Autowired
	private FundingRepository fundingRepository;

	@DisplayName("FundingRepository - 업체별 월간 통계 조회 테스트")
	@Test
	public void testMethod() {

		// given
		// Long businessId = 1L;
		User user = new User(1L, "테스트유저", "imgUrl", null, true, 0, null, null);
		Business business = new Business(1L, "테스트업체", "imgUrl", "010", "ceo", "이메일", 0, )
		Funding funding1 = new Funding();

		// when

		// then

	}
}
