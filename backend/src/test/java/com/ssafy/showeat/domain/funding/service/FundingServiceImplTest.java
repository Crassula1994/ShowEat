package com.ssafy.showeat.domain.funding.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.IntegrationTestSupport;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.entity.BusinessMenuImage;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.MenuRequestDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.CredentialRole;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;

class FundingServiceImplTest extends IntegrationTestSupport {

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

	@Autowired
	private BusinessMenuRepository businessMenuRepository;

	@Test
	@Transactional
	@DisplayName("펀딩을 생성합니다.")
	void 펀딩생성(){
	    // given
		MenuRequestDto menuDto1 = MenuRequestDto.builder()
			.menuId(1L)
			.discountPrice(2000)
			.build();

		MenuRequestDto menuDto2 = MenuRequestDto.builder()
			.menuId(2L)
			.discountPrice(1000)
			.build();

		CreateFundingRequestDto dto = CreateFundingRequestDto
			.builder()
			.title("테스트")
			.description("테스트입니다.")
			.category("한식")
			.maxLimit(10)
			.minLimit(5)
			.tags(List.of("tag1","tag2"))
			.endDate(LocalDate.now())
			.menuRequestDtos(List.of(menuDto1,menuDto2))
			.build();

		Business business = SaveBusinessMenu();
		BusinessMenu businessMenu = businessMenuRepository.findById(1L).get();

		// when
		Funding save = fundingRepository.save(dto.createFunding(business, businessMenu, menuDto1.getDiscountPrice()));

		// then
		assertThat(save.getFundingTitle()).isEqualTo("테스트");
		assertThat(save.getFundingCategory()).isEqualTo("한식");
		assertThat(save.getFundingMenu()).isEqualTo("메뉴1");
		assertThat(save.getFundingDiscountPrice()).isEqualTo(2000);
		assertThat(save.getFundingTags()).hasSize(2)
			.extracting("fundingTag")
			.containsExactlyInAnyOrder("tag1","tag2");
		assertThat(save.getFundingImages()).hasSize(2)
			.extracting("fundingImgUrl")
			.containsExactlyInAnyOrder("img1","img2");
	}

	@Test
	@DisplayName("펀딩에 동시에 100명이 참여하는경우 동시성 문제가 발생하지 않는다.")
	void 동시에_100명이_참여() throws InterruptedException {
	    // given
		Funding funding = createFunding();
		fundingRepository.save(funding);
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
					fundingService.applyFunding(1L,user);
				} finally {
					latch.countDown();
				}
			});
		}

		latch.await();
		Funding resultFunding = fundingRepository.findById(1L).get();

		// then
		assertThat(resultFunding.getFundingCurCount()).isEqualTo(100);
	}

	@Test
	@Transactional
	@DisplayName("고객이 펀딩참여시 펀딩금액만큼 소지금이 차감됩니다. 또한 펀딩 참여액이 그만큼 증가합니다.")
	void 펀딩참여_고객소지금_차감_펀딩참여액_증가() {
	    // given
		Funding funding = createFunding();
		fundingRepository.save(funding);
		User user = createUser();
		int prevMoney = user.getUserMoney();
		int prevFundingTotalAmount = funding.getFundingTotalAmount();

		// when
		fundingService.applyFunding(1L,user);
		Funding resultFunding = fundingRepository.findById(1L).get();

		// then
		assertThat(prevFundingTotalAmount).isEqualTo(0);
		assertThat(resultFunding.getFundingTotalAmount()).isEqualTo(resultFunding.getFundingDiscountPrice());
		assertThat(user.getUserMoney()).isEqualTo(prevMoney - funding.getFundingDiscountPrice());
	}

	private Funding createFunding(){
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
			.fundingCategory("한식")
			.fundingDescription("설명")
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(FundingIsActive.ACTIVE)
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