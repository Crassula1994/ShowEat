package com.ssafy.showeat.domain.funding.service;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.showeat.IntegrationTestSupport;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.entity.BusinessMenuImage;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingCategory;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.CredentialRole;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;

public class FundingServiceImplConcurrencyTest extends IntegrationTestSupport {

	@Autowired
	private FundingService fundingService;

	@Autowired
	private FundingRepository fundingRepository;

	@Autowired
	private BusinessRepository businessRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CredentialRepository credentialRepository;

	@Test
	@DisplayName("펀딩에 동시에 100명이 참여하는경우 동시성 문제가 발생하지 않는다.")
	void 동시에_100명이_참여() throws InterruptedException {
		// given
		Funding funding = createFunding(FundingIsActive.ACTIVE);
		Funding save = fundingRepository.save(funding);
		createUsers();
		int threadCount = 100;

		//멀티 쓰레드를 사용하기 위함, 비동기 작업을 단순화 해줌
		ExecutorService executorService = Executors.newFixedThreadPool(32);
		//다른쓰레드의 작업이 끝날때까지 기다림
		CountDownLatch latch = new CountDownLatch(threadCount);

		// when
		for (int i = 1; i <= threadCount; i++) {
			int finalI = i;
			executorService.submit(() -> {
				try {
					User user = userRepository.findById((long)finalI).get();
					fundingService.applyFunding(save.getFundingId(),user);
				} finally {
					latch.countDown();
				}
			});
		}

		latch.await();
		Funding resultFunding = fundingRepository.findById(save.getFundingId()).get();

		// then
		assertThat(resultFunding.getFundingCurCount()).isEqualTo(100);
	}

	private Funding createFunding(FundingIsActive fundingIsActive){
		Business business = SaveBusinessMenu();
		return Funding.builder()
			.fundingTitle("맛있는 과자에요")
			.fundingMaxLimit(100)
			.fundingMinLimit(10)
			.fundingCurCount(0)
			.userFundings(new ArrayList<>())
			.fundingDiscountPrice(3000)
			.fundingDiscountRate(10)
			.fundingMenu("과자")
			.fundingPrice(10000)
			.fundingTotalAmount(0)
			.fundingCategory(FundingCategory.KOREAN)
			.fundingDescription("설명")
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(fundingIsActive)
			.fundingIsSuccess(FundingIsSuccess.SUCCESS)
			.business(business)
			.build();
	}

	private void createUsers(){
		Credential credential1 =
			Credential.builder()
				.credentialId("qqq")
				.email("qwe@qwe.com")
				.credentialRole(CredentialRole.USER)
				.credentialSocialPlatform("kakao")
				.build();

		for (int i = 0; i < 100; i++) {
			userRepository.save(User.builder()
				.userNickname("테스트1")
				.userImgUrl("profileimg")
				.userAddress("addr")
				.userBusiness(true)
				.userMoney(10000)
				.credential(credential1)
				.build());
		}
	}

	private User createUser(){
		Credential credential1 =
			Credential.builder()
				.credentialId("qqq")
				.email("qwe@qwe.com")
				.credentialRole(CredentialRole.USER)
				.credentialSocialPlatform("kakao")
				.build();

		User user1 = User.builder()
			.userNickname("테스트1")
			.userImgUrl("profileimg")
			.userAddress("addr")
			.userBusiness(true)
			.userMoney(10000)
			.credential(credential1)
			.build();

		credentialRepository.save(credential1);
		return userRepository.save(user1);
	}

	private Business SaveBusinessMenu(){
		User user1 = createUser();

		BusinessMenuImage businessMenuImage1 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img1")
			.build();

		BusinessMenuImage businessMenuImage2 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img2")
			.build();

		BusinessMenuImage businessMenuImage3 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img3")
			.build();
		BusinessMenuImage businessMenuImage4 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img4")
			.build();

		// 업체 메뉴
		BusinessMenu businessMenu1 = BusinessMenu.builder()
			.businessMenuName("메뉴1")
			.businessMenuPrice(5000)
			.businessMenuImages(new ArrayList<>())
			.build();

		BusinessMenu businessMenu2 = BusinessMenu.builder()
			.businessMenuName("메뉴2")
			.businessMenuPrice(6000)
			.businessMenuImages(new ArrayList<>())
			.build();

		businessMenu1.addBusinessMenuImage(businessMenuImage1);
		businessMenu1.addBusinessMenuImage(businessMenuImage2);
		businessMenu2.addBusinessMenuImage(businessMenuImage3);
		businessMenu2.addBusinessMenuImage(businessMenuImage4);

		// 업체
		Business business = Business.builder()
			.businessName("카우카우")
			.businessBio("bio")
			.businessImgUrl("imgurl")
			.businessPhone("01012341234")
			.businessCeo("테스트1")
			.businessEmail("qwe@qwe.com")
			.businessMoney(10000)
			.businessFundingCount(10)
			.businessSupporterCount(10)
			.businessAddress("주소")
			.bankBookUrl("aaa")
			.businessAccount("zzz")
			.businessRegistrationUrl("zbcb")
			.businessSupporterCount(5)
			.businessAccountHolder("zxczxc")
			.businessMenus(new ArrayList<>())
			.user(user1)
			.build();

		business.addBusinessMenu(businessMenu1);
		business.addBusinessMenu(businessMenu2);

		return businessRepository.save(business);
	}
}
