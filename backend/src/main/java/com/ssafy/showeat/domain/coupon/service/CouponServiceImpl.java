package com.ssafy.showeat.domain.coupon.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponPriceRequestDto;
import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponPageResponseDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.coupon.entity.CouponType;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.UserFunding;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.ImpossibleCouponUseException;
import com.ssafy.showeat.global.exception.InvalidCouponTypeException;
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
	public CouponPageResponseDto getCouponListByUserIdAndStatus(Long userId, CouponStatus status, int page) {
		log.info("CouponService_getCouponListByUserIdAndStatus || 유저의 상태별 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		Page<Coupon> couponList = couponRepository.findCouponListByUserAndStatus(PageRequest.of(page, 12), user,
			status);
		return CouponPageResponseDto.createCouponPageResponseDto(couponList);
	}

	@Override
	public CouponResponseDto getCouponDetailByCouponId(Long couponId) {
		log.info("CouponService_getCouponDetailByCouponId || 해당 쿠폰의 상세 정보 조회");
		Coupon coupon = couponRepository.findById(couponId).orElseThrow(NotExistCouponException::new);
		return coupon.toCouponResponseDto();
	}

	@Override
	@Transactional
	public void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto) {
		log.info("CouponService_updateCouponStatus || 해당 쿠폰의 상태를 변경");
		Coupon coupon = couponRepository.findById(updateCouponStatusRequestDto.getCouponId()).orElseThrow(
			NotExistCouponException::new);
		coupon.updateStatus(updateCouponStatusRequestDto.getCouponStatus());
	}

	@Override
	@Transactional
	public void updateCouponPrice(UpdateCouponPriceRequestDto updateCouponPriceRequestDto , User user) {
		log.info("CouponService_updateCouponPrice || 해당 쿠폰의 금액을 차감");
		Coupon coupon = couponRepository.findById(updateCouponPriceRequestDto.getCouponId()).orElseThrow(
			NotExistCouponException::new);

		if (coupon.getCouponType() != CouponType.GIFTCARD) {
			throw new InvalidCouponTypeException();
		}

		if(!user.getUserId().equals(coupon.getFunding().getBusiness().getUser().getUserId()))
			throw new ImpossibleCouponUseException();

		int amount = updateCouponPriceRequestDto.getCouponAmount();
		coupon.updatePrice(amount);
		System.out.println(coupon.getCouponPrice());
		if (coupon.getCouponPrice() == 0) {
			coupon.updateStatus(CouponStatus.USED);
		}
	}

	@Override
	@Transactional
	public void updateCouponStatusByOwner(Long couponId, User user) {
		log.info("CouponService_updateCouponStatusByOwner || 업주가 쿠폰 사용 처리");
		Coupon coupon = couponRepository.findById(couponId).orElseThrow(NotExistCouponException::new);

		if(!user.getUserId().equals(coupon.getFunding().getBusiness().getUser().getUserId()))
			throw new ImpossibleCouponUseException();

		coupon.updateStatus(CouponStatus.USED);
	}

	@Override
	@Transactional
	public List<Coupon> createCoupon(Funding funding) {
		log.info("CouponService_createCoupon || 펀딩 성공에 따른 쿠폰 발급");
		List<Coupon> couponList = new ArrayList<>();

		for (UserFunding userFunding : funding.getUserFundings()) {
			// 쿠폰 발급
			User user = userFunding.getUser();
			Coupon coupon = Coupon.createCouponByFundingSuccess(user, funding);
			couponList.add(coupon);
		}
		if (!couponList.isEmpty())
			couponRepository.saveAll(couponList);

		return couponList;
	}
}
