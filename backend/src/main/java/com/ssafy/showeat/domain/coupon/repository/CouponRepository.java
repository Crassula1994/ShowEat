package com.ssafy.showeat.domain.coupon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.user.entity.User;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

	List<Coupon>findByUser(User user);
}
