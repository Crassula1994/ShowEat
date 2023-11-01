package com.ssafy.showeat.domain.coupon.repository;

import java.util.List;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.user.entity.User;

public interface CouponCustomRepository {
	List<Coupon> findCouponListByUserAndStatus(User user, CouponStatus couponStatus);
}
