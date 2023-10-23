package com.ssafy.showeat.global.util;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.entity.BusinessMenuImage;
import com.ssafy.showeat.domain.credential.entity.Credential;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitDb {

	private final InitService initService;

	@PostConstruct
	public void init() {
		// initService.init();
	}

	@Component
	@Transactional
	@RequiredArgsConstructor
	static class InitService {

		private final EntityManager em;

		public void init() {
			Credential credential1 =
				Credential.builder()
					.credentialId("qqq")
					.credentialRefreshToken("qq")
					.credentialEmail("qwe@qwe.com")
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
				.businessMenus(new ArrayList<>())
				.user(user1)
				.build();

			business.addBusinessMenu(businessMenu1);
			business.addBusinessMenu(businessMenu2);

			em.persist(user1);
			em.persist(business);

		}
	}
}
