package com.ssafy.showeat.domain.review.repository;

import static com.ssafy.showeat.domain.review.entity.QReview.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.showeat.domain.review.entity.Review;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom{

	private final JPAQueryFactory queryFactory;

	@Override
	public Page<Review> findReviewInFunding(Pageable pageable , Long fundingId) {
		List<Review> content = queryFactory
			.selectFrom(review)
			.where(review.funding.fundingId.eq(fundingId))
			.orderBy(review.createdDate.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		long totalCount = queryFactory
			.selectFrom(review)
			.where(review.funding.fundingId.eq(fundingId))
			.fetchCount();

		return new PageImpl<>(content, pageable, totalCount);
	}
}
