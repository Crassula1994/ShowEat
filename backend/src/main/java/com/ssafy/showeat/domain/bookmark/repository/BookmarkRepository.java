package com.ssafy.showeat.domain.bookmark.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface BookmarkRepository extends JpaRepository<Bookmark,Long> {


	@Query(value = "SELECT COUNT(*) > 0 FROM bookmark WHERE user_id = :userId AND funding_id = :fundingId", nativeQuery = true)
	boolean existsByUserIdAndFundingId(@Param("userId") Long userId,@Param("fundingId") Long fundingId);
	Bookmark findByUserAndFunding(User user , Funding funding);

	@Query("SELECT COUNT(b) FROM Bookmark b WHERE b.funding.fundingId = :fundingId")
	int countByFundingId(@Param("fundingId") Long fundingId);

	Page<Bookmark> findByUser(User user, Pageable pageable);
}
