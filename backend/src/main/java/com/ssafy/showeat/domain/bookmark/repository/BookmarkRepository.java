package com.ssafy.showeat.domain.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface BookmarkRepository extends JpaRepository<Bookmark,Long> {
	boolean existsByUserAndFunding(User user , Funding funding);
	Bookmark findByUserAndFunding(User user , Funding funding);

	@Query("SELECT COUNT(b) FROM Bookmark b WHERE b.funding.fundingId = :fundingId")
	int countByFundingId(@Param("fundingId") Long fundingId);
}
