package com.ssafy.showeat.domain.funding.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;

public interface FundingRepository extends JpaRepository<Funding, Long>, FundingCustomRepository {
	Page<Funding> findByBusinessAndFundingIsActive(Business business, FundingIsActive state, Pageable pageable);
}
