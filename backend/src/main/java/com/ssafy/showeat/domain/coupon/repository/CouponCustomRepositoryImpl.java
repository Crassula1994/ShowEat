package com.ssafy.showeat.domain.coupon.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.coupon.entity.QCoupon;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Repository
public class CouponCustomRepositoryImpl implements CouponCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;
	private final QCoupon coupon = QCoupon.coupon;

	@Override
	public List<Coupon> findCouponListByUserAndStatus(User user, CouponStatus status) {
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(coupon.user.eq(user));
		if (status != null) {
			builder.and(coupon.couponStatus.eq(status));
		}

		JPAQuery<Coupon> query = jpaQueryFactory
			.selectFrom(coupon)
			.where(builder);

		return query.fetch();
	}

}
