package com.ssafy.showeat.domain.coupon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.user.entity.User;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

	List<Coupon> findByUser(User user);

	@Query("SELECT c FROM Coupon c WHERE c.user = :user AND c.couponStatus = 'ACTIVE'")
	List<Coupon> findActiveCouponByUser(@Param("user") User user);

	@Query("SELECT c FROM Coupon c WHERE c.user = :user AND c.couponStatus = 'USED'")
	List<Coupon> findUsedCouponByUser(@Param("user") User user);

	@Query("SELECT c FROM Coupon c WHERE c.user = :user AND c.couponStatus = 'EXPIRED'")
	List<Coupon> findExpiredCouponByUser(@Param("user") User user);
}
