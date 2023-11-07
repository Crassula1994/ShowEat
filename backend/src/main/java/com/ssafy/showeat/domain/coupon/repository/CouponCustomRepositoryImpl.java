package com.ssafy.showeat.domain.coupon.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
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
	public Page<Coupon> findCouponListByUserAndStatus(Pageable pageable, User user, CouponStatus status) {
		BooleanBuilder builder = new BooleanBuilder();
		builder.and(coupon.user.eq(user));
		if (status != null) {
			builder.and(coupon.couponStatus.eq(status));
		}

		List<Coupon> content = jpaQueryFactory
			.selectFrom(coupon)
			.where(builder)
			.orderBy(coupon.couponId.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		long totalCount = jpaQueryFactory
			.selectFrom(coupon)
			.where(builder)
			.fetch().size();

		return new PageImpl<>(content, pageable, totalCount);
	}
}
