package com.ssafy.showeat.domain.coupon.service;

import static com.ssafy.showeat.domain.coupon.entity.CouponStatus.*;
import static com.ssafy.showeat.domain.coupon.entity.CouponType.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class CouponServiceTest {
	@Autowired
	private CouponServiceImpl couponService;

	@Autowired
	private CouponRepository couponRepository;

	@Mock
	private UserRepository userRepository;

	@DisplayName("상태별 쿠폰 리스트 조회 테스트")
	@Test
	public void testGetCouponListByUserId() {
		// Given
		Long userId = 1L;
		User user = new User(); // Mock User 객체
		Coupon coupon1 = new Coupon(1L, 100, ACTIVE, LocalDate.now().plusDays(90), user, new Funding());
		Coupon coupon2= new Coupon(2L, 200, EXPIRED, LocalDate.now().plusDays(90), user, new Funding());
		Coupon coupon3= new Coupon(3L, 300, USED, LocalDate.now().plusDays(90), user, new Funding());
		Coupon coupon4= new Coupon(4L, 400, ACTIVE, LocalDate.now().plusDays(90), user, new Funding());
		Coupon coupon5= new Coupon(5L, 500, EXPIRED, LocalDate.now().plusDays(90), user, new Funding());
		Coupon coupon6= new Coupon(6L, 600, USED, LocalDate.now().plusDays(90), user, new Funding());

		couponRepository.save(coupon1);
		couponRepository.save(coupon2);
		couponRepository.save(coupon3);
		couponRepository.save(coupon4);
		couponRepository.save(coupon5);
		couponRepository.save(coupon6);

		// When
		// Mock UserRepository의 동작 설정
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		List<Coupon> activeCouponList = couponRepository.findCouponListByUserAndStatus(user, ACTIVE);
		List<Coupon> expiredCouponList = couponRepository.findCouponListByUserAndStatus(user, EXPIRED);
		List<Coupon> usedCouponList = couponRepository.findCouponListByUserAndStatus(user, USED);

		// 테스트 대상 메서드 호출
		// List<> result = couponService.getActiveCouponListByUserId(userId);

		// then
		assertEquals(2, activeCouponList.size());
		assertEquals(2, expiredCouponList.size());
		assertEquals(2, usedCouponList.size());
		// Coupon resultCoupon1 = activeCouponList.get(0);
		// Coupon resultCoupon2 = activeCouponList.get(1);

		// assertEquals(1L, resultCoupon1.getCouponId());
		// assertEquals(CouponStatus.ACTIVE, resultCoupon1.getCouponStatus());
		// assertEquals(100, resultCoupon1.getCouponPrice());
		//
		// assertEquals(2L, resultCoupon2.getCouponId());
		// assertEquals(CouponStatus.ACTIVE, resultCoupon2.getCouponStatus());
		// assertEquals(200, resultCoupon2.getCouponPrice());
	}

	@Test
	public void testUpdateCouponStatus() {
		// 1. given
		// Mock 데이터 생성
		// Long couponId = 1L;
		// CouponStatus newState = USED;
		// Coupon coupon = new Coupon(1L, 10, ACTIVE, LocalDate.now(), new User(), new Funding());
		// UpdateCouponStatusRequestDto updateCouponStatusRequestDto = new UpdateCouponStatusRequestDto();
		// updateCouponStatusRequestDto.setCouponId(couponId);
		// updateCouponStatusRequestDto.setCouponStatus(newState);
		//
		// // 2. when
		// // CouponRepository findById 메서드 Mock 설정
		// when(couponRepository.findById(couponId)).thenReturn(Optional.of(coupon));
		//
		// // 3. then
		// // updateCouponStatus 메서드 호출
		// couponService.updateCouponStatus(updateCouponStatusRequestDto);
		//
		// // 4. assert
		// assertEquals(newState, coupon.getCouponStatus());
	}
}