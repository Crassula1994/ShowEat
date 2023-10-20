package com.ssafy.showeat.domain.funding.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.MenuRequestDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundingServiceImpl implements FundingService {

	private final FundingRepository fundingRepository;
	private final BusinessRepository businessRepository;
	private final BusinessMenuRepository businessMenuRepository;

	@Override
	@Transactional
	public void createFunding(CreateFundingRequestDto createFundingRequestDto) {
		log.info("FundingServiceImpl_createFunding || 업주가 펀딩을 생성");

		// TODO : USERID를 받든 , Request에서 JWT토큰 기반으로 유저를 찾아오든 해야함
		int userId = 1;
		User loginUser = new User();

		// TODO : 업주가 아닌 사람이 펀딩을 생성하려고 하면 예외처리를 해줘야함

		Business business = businessRepository.findByUser(loginUser).get();


		// TODO : 각 메뉴ID에 대해서 정보 가지고 오기
		for (MenuRequestDto menuRequestDto : createFundingRequestDto.getMenuRequestDtos()) {
			BusinessMenu businessMenu = businessMenuRepository.findById(menuRequestDto.getMenuId()).get();
			fundingRepository.save(createFundingRequestDto.createFunding(business,businessMenu,menuRequestDto.getDiscountPrice()));
		}
	}
}
