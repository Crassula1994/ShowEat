package com.ssafy.showeat.domain.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface BookmarkRepository extends JpaRepository<Bookmark,Long> {
	boolean existsByUserAndFunding(User user , Funding funding);
	Bookmark findByUserAndFunding(User user , Funding funding);
}
