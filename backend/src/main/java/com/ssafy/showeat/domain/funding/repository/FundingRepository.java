package com.ssafy.showeat.domain.funding.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.funding.entity.Funding;

public interface FundingRepository extends JpaRepository<Funding,Long> {
}
