package com.ssafy.showeat.domain.coupon.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponDetailResponseDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponListResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.NotExistCouponException;
import com.ssafy.showeat.global.exception.NotExistUserException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CouponServiceImpl implements CouponService {
	private final CouponRepository couponRepository;
	private final UserRepository userRepository;

	@Override
	public List<CouponListResponseDto> getCouponListByUserIdAndStatus(Long userId, CouponStatus status) {
		log.info("CouponService_getCouponListByUserIdAndStatus || 유저의 상태별 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		List<Coupon> couponList = couponRepository.findCouponListByUserAndStatus(user, status);
		return couponList.stream().map(Coupon::toCouponListResponseDto).collect(Collectors.toList());
	}

	@Override
	public List<CouponListResponseDto> getActiveCouponListByUserId(Long userId) {
		log.info("CouponService_getActiveCouponLIstByUserid || 유저의 사용가능 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		List<Coupon> couponList = couponRepository.findActiveCouponByUser(user);
		return couponList.stream().map(Coupon::toCouponListResponseDto).collect(Collectors.toList());
	}

	@Override
	public List<CouponListResponseDto> getUsedCouponListByUserId(Long userId) {
		log.info("CouponService_getUsedCouponLIstByUserid || 유저의 사용완료 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		List<Coupon> couponList = couponRepository.findUsedCouponByUser(user);
		return couponList.stream().map(Coupon::toCouponListResponseDto).collect(Collectors.toList());
	}

	@Override
	public List<CouponListResponseDto> getExpiredCouponListByUserId(Long userId) {
		log.info("CouponService_getExpiredCouponLIstByUserid || 유저의 사용완료 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		List<Coupon> couponList = couponRepository.findExpiredCouponByUser(user);
		return couponList.stream().map(Coupon::toCouponListResponseDto).collect(Collectors.toList());
	}

	@Override
	public CouponDetailResponseDto getCouponDetailByCouponId(Long couponId) {
		log.info("CouponService_getCouponDetailByCouponId || 해당 쿠폰의 상세 정보 조회");
		Coupon coupon = couponRepository.findById(couponId).orElseThrow(NotExistCouponException::new);
		return coupon.toCouponDetailResponseDto();
	}

	@Override
	@Transactional
	public void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto) {
		log.info("CouponService_updateCouponStatus || 해당 쿠폰 사용 처리");
		Coupon coupon = couponRepository.findById(updateCouponStatusRequestDto.getCouponId()).orElseThrow(
			NotExistCouponException::new);
		coupon.updateStatus(updateCouponStatusRequestDto.getCouponStatus());
	}
}
