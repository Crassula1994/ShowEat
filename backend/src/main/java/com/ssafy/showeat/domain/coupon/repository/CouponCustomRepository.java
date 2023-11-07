package com.ssafy.showeat.domain.coupon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.user.entity.User;

public interface CouponCustomRepository {
	Page<Coupon> findCouponListByUserAndStatus(Pageable pageable, User user, CouponStatus couponStatus);
}
