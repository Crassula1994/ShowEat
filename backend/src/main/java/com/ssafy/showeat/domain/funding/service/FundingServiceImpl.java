package com.ssafy.showeat.domain.funding.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.bookmark.service.BookmarkService;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.MenuRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.funding.repository.UserFundingRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.DuplicationApplyFundingException;
import com.ssafy.showeat.global.exception.ImpossibleApplyFundingException;
import com.ssafy.showeat.global.exception.ImpossibleCancelFundingException;
import com.ssafy.showeat.global.exception.InactiveFundingException;
import com.ssafy.showeat.global.exception.LackPointUserFundingException;
import com.ssafy.showeat.global.exception.NotExistFundingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundingServiceImpl implements FundingService {

	private final UserRepository userRepository;
	private final UserFundingRepository userFundingRepository;
	private final FundingRepository fundingRepository;
	private final BusinessRepository businessRepository;
	private final BusinessMenuRepository businessMenuRepository;
	private final BookmarkService bookmarkService;

	@Override
	@Transactional
	public void createFunding(CreateFundingRequestDto createFundingRequestDto) {
		log.info("FundingServiceImpl_createFunding || 업주가 펀딩을 생성");

		// TODO : USERID를 받든 , Request에서 JWT토큰 기반으로 유저를 찾아오든 해야함
		Long userId = 1l;
		User loginUser = userRepository.findById(userId).get();

		// TODO : 업주가 아닌 사람이 펀딩을 생성하려고 하면 예외처리를 해줘야함
		Business business = businessRepository.findByUser(loginUser).get();


		// TODO : 각 메뉴ID에 대해서 정보 가지고 오기
		for (MenuRequestDto menuRequestDto : createFundingRequestDto.getMenuRequestDtos()) {
			BusinessMenu businessMenu = businessMenuRepository.findById(menuRequestDto.getMenuId()).get();
			fundingRepository.save(createFundingRequestDto.createFunding(business,businessMenu,menuRequestDto.getDiscountPrice()));
		}
	}

	@Override
	@Transactional
	public void applyFunding(Long fundingId) {
		log.info("FundingServiceImpl_applyFunding ||  펀딩 참여");
		Long userId = 1l;
		User loginUser = userRepository.findById(userId).get();
		Funding funding = fundingRepository.findById(fundingId).orElseThrow(NotExistFundingException::new);

		fundingValidation(funding,loginUser);

		funding.addUserFunding(funding,loginUser);
		loginUser.spendMoney(funding.getFundingDiscountPrice());
		funding.addMoney();

		if(!funding.isMaxLimit()) return;
		funding.changeFundingStatusByMaxApply();
		// TODO : 쿠폰 발급
		// TODO : HISTORY 생성
	}

	@Override
	@Transactional
	public void cancelFunding(Long fundingId) {
		log.info("FundingServiceImpl_cancelFunding ||  펀딩 참여 취소");
		Long userId = 1l;
		User loginUser = userRepository.findById(userId).get();
		Funding funding = fundingRepository.findById(fundingId).orElseThrow(NotExistFundingException::new);

		if(funding.getFundingIsActive().equals(FundingIsActive.INACTIVE))
			throw new InactiveFundingException();

		if(!userFundingRepository.existsByUserAndFunding(loginUser,funding))
			throw new ImpossibleCancelFundingException();

		userFundingRepository.delete(userFundingRepository.findByUserAndFunding(loginUser,funding));
		loginUser.refundMoney(funding.getFundingDiscountPrice());
		funding.cancelFunding();
	}

	@Override
	public FundingResponseDto getFunding(Long fundingId) {
		log.info("FundingServiceImpl_getFunding ||  펀딩 조회");

		Long userId = 1l;
		User loginUser = userRepository.findById(userId).get();
		Funding funding = fundingRepository.findById(fundingId).orElseThrow(NotExistFundingException::new);
		// TODO : 로그인 한 유저가 존재하지 않는다면 isBookmark = false
		boolean isBookmark = bookmarkService.isBookmark(loginUser,funding);
		int bookmarkCount = bookmarkService.getBookmarkCountByFundingId(fundingId);

		return funding.toFundingResponseDto(bookmarkCount , isBookmark);
	}

	private void fundingValidation(Funding funding , User loginUser){
		if(funding.getFundingIsActive().equals(FundingIsActive.INACTIVE))
			throw new InactiveFundingException();

		if(!funding.isApply())
			throw new ImpossibleApplyFundingException();

		if(userFundingRepository.existsByUserAndFunding(loginUser,funding))
			throw new DuplicationApplyFundingException();

		if(!loginUser.haveMoney(funding.getFundingPrice()))
			throw new LackPointUserFundingException();
	}
}