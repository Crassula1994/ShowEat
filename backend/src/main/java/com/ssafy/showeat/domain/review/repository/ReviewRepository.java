package com.ssafy.showeat.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review,Long> ,ReviewRepositoryCustom {
}
