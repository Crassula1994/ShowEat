package com.ssafy.showeat.domain.funding.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.UserFunding;
import com.ssafy.showeat.domain.user.entity.User;

public interface UserFundingRepository extends JpaRepository<UserFunding,Long> {
	boolean existsByUserAndFunding(User user, Funding funding);
	UserFunding findByUserAndFunding(User user,Funding funding);
	Page<UserFunding> findByUser(User user, Pageable pageable);
}
