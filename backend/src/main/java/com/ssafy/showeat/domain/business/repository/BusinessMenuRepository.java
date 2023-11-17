package com.ssafy.showeat.domain.business.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;

public interface BusinessMenuRepository extends JpaRepository<BusinessMenu,Long> {
}
