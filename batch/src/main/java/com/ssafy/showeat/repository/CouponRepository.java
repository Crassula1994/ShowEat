package com.ssafy.showeat.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.showeat.domain.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
}
