package com.ssafy.showeat.domain.coupon.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStateRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.NotExistAccountException;
import com.ssafy.showeat.global.exception.NotExistCouponException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CouponServiceImpl implements CouponService {
	private final CouponRepository couponRepository;
	private final UserRepository userRepository;

	@Override
	public List<CouponResponseDto> getCouponListByUserId(Long userId) {
		log.info("CouponService_getCouponLIstByUserid -> 유저의 모든 쿠포 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistAccountException::new);
		List<Coupon> couponList = couponRepository.findByUser(user);
		return couponList.stream().map(Coupon::toCouponResponseDto).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void updateCouponState(UpdateCouponStateRequestDto updateCouponStateRequestDto) {
		log.info("CouponService_updateCouponState -> 해당 쿠폰 사용 처리");
		Coupon coupon = couponRepository.findById(updateCouponStateRequestDto.getCouponId()).orElseThrow(
			NotExistCouponException::new);
		coupon.updateState(updateCouponStateRequestDto.getCouponState());
	}
}
