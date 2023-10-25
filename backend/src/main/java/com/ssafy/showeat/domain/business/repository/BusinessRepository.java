package com.ssafy.showeat.domain.business.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.user.entity.User;

public interface BusinessRepository extends JpaRepository<Business, Long> {
	Optional<Business> findByUser(User user);
}
