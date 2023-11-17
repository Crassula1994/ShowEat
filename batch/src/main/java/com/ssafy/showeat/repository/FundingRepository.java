package com.ssafy.showeat.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.Funding;
import com.ssafy.showeat.domain.FundingIsActive;

public interface FundingRepository extends JpaRepository<Funding,Long> {
	List<Funding> findByFundingIsActiveAndFundingEndDate(FundingIsActive fundingIsActive, LocalDate fundingEndDate);
}
