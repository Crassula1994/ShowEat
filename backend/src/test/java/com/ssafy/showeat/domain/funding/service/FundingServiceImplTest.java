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

import org.junit.jupiter.api.AfterEach;
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
import com.ssafy.showeat.domain.funding.entity.FundingCategory;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.CredentialRole;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.DuplicationApplyFundingException;
import com.ssafy.showeat.global.exception.ImpossibleApplyFundingException;
import com.ssafy.showeat.global.exception.ImpossibleCancelFundingException;
import com.ssafy.showeat.global.exception.InactiveFundingException;
import com.ssafy.showeat.global.exception.LackPointUserFundingException;

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

	@AfterEach
	void reset() {
		fundingRepository.deleteAll();
		businessRepository.deleteAll();
		userRepository.deleteAll();
	}

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
			.category("KOREAN")
			.maxLimit(10)
			.minLimit(5)
			.tags(List.of("tag1","tag2"))
			.endDate(LocalDate.now())
			.menuRequestDtos(List.of(menuDto1,menuDto2))
			.build();

		Business business = SaveBusinessMenu();

		// when
		Funding save = fundingRepository.save(dto.createFunding(business, business.getBusinessMenus().get(0), menuDto1.getDiscountPrice()));

		// then
		assertThat(save.getFundingTitle()).isEqualTo("테스트");
		assertThat(save.getFundingCategory()).isEqualTo(FundingCategory.KOREAN);
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
	@Transactional
	@DisplayName("고객이 펀딩참여시 펀딩금액만큼 소지금이 차감됩니다. 또한 펀딩 참여액이 그만큼 증가합니다.")
	void 펀딩참여_고객소지금_차감_펀딩참여액_증가() {
	    // given
		Funding funding = createFunding(FundingIsActive.ACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();
		int prevMoney = user.getUserMoney();
		int prevFundingTotalAmount = funding.getFundingTotalAmount();

		// when
		fundingService.applyFunding(save.getFundingId(),user);
		Funding resultFunding = fundingRepository.findById(save.getFundingId()).get();

		// then
		assertThat(prevFundingTotalAmount).isEqualTo(0);
		assertThat(resultFunding.getFundingTotalAmount()).isEqualTo(resultFunding.getFundingDiscountPrice());
		assertThat(user.getUserMoney()).isEqualTo(prevMoney - funding.getFundingDiscountPrice());
	}

	@Test
	@DisplayName("사용자는 동일한 펀딩에 두 번 이상 참여할 수 없다. 중복 참여시 예외가 발생한다.")
	void 펀딩_중복_참여() {
	    // given
		Funding funding = createFunding(FundingIsActive.ACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();
		fundingService.applyFunding(save.getFundingId(),user);

	    // when // then
		assertThrows(DuplicationApplyFundingException.class,() -> fundingService.applyFunding(save.getFundingId(),user));
	}

	@Test
	@DisplayName("비활성화된 펀딩에 대해서는 참여할 수 없습니다. 참여시 예외가 발생합니다.")
	void 비활성화_펀딩참여() {
	    // given
		Funding funding = createFunding(FundingIsActive.INACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();

	    // when // then
		assertThrows(InactiveFundingException.class,() -> fundingService.applyFunding(save.getFundingId(),user));
	}

	@Test
	@DisplayName("사용자의 포인트가 부족할 시 펀딩에 참여할 수 없습니다.")
	void 포인트_부족한_유저의_펀딩참여() {
	    // given
		Funding funding = createFunding(FundingIsActive.ACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();

		// 돈을 차감함으로서 현재 유저의 소지금은 0원
		user.spendMoney(10000);

	    // when // then
		assertThrows(LackPointUserFundingException.class,() -> fundingService.applyFunding(save.getFundingId(),user));
	}

	@Test
	@DisplayName("사용자는 펀딩을 취소할 수 있다.취소시 펀딩참여 count,모금액 등이 감소한다.")
	void 사용자_참여_펀딩_취소() {
	    // given
		Funding funding = createFunding(FundingIsActive.ACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();
		fundingService.applyFunding(save.getFundingId(),user);

	    // when
		fundingService.cancelFunding(save.getFundingId(),user);

	    // then
		Funding resultFunding = fundingRepository.findById(save.getFundingId()).get();
		assertThat(resultFunding.getFundingCurCount()).isEqualTo(0);
		assertThat(resultFunding.getFundingTotalAmount()).isEqualTo(0);
		assertThat(user.getUserMoney()).isEqualTo(10000);
	}

	@Test
	@DisplayName("비활성화된 펀딩에 대해서는 펀딩을 취소할 수 없다.")
	void 비활성화된_펀딩_취소() {
	    // given
		Funding funding = createFunding(FundingIsActive.INACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();

	    // when // then
		assertThrows(InactiveFundingException.class,() -> fundingService.cancelFunding(save.getFundingId(),user));
	}

	@Test
	@DisplayName("참여하지 않은 펀딩에 대해서는 펀딩을 취소할 수 없다.")
	void 참여하지_않은_펀딩_취소() {
	    // given
		Funding funding = createFunding(FundingIsActive.ACTIVE);
		Funding save = fundingRepository.save(funding);
		User user = createUser();

	    // when // then
		assertThrows(ImpossibleCancelFundingException.class,() -> fundingService.cancelFunding(save.getFundingId(),user));
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