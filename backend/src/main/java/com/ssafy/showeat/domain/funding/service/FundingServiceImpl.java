package com.ssafy.showeat.domain.funding.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.bookmark.service.BookmarkService;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.coupon.service.CouponService;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.MenuRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.SearchFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingCategory;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingSearchType;
import com.ssafy.showeat.domain.funding.entity.FundingSortType;
import com.ssafy.showeat.domain.funding.entity.UserFunding;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.funding.repository.UserFundingRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.service.UserService;
import com.ssafy.showeat.global.exception.BlankSearchKeywordException;
import com.ssafy.showeat.global.exception.DuplicationApplyFundingException;
import com.ssafy.showeat.global.exception.ImpossibleApplyFundingException;
import com.ssafy.showeat.global.exception.ImpossibleCancelFundingException;
import com.ssafy.showeat.global.exception.InactiveFundingException;
import com.ssafy.showeat.global.exception.InvalidCategoryTypeException;
import com.ssafy.showeat.global.exception.InvalidSearchTypeException;
import com.ssafy.showeat.global.exception.InvalidSortTypeException;
import com.ssafy.showeat.global.exception.LackPointUserFundingException;
import com.ssafy.showeat.global.exception.NotExistBusinessException;
import com.ssafy.showeat.global.exception.NotExistFundingException;
import com.ssafy.showeat.global.exception.NotExistPageFundingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundingServiceImpl implements FundingService {

	private final UserFundingRepository userFundingRepository;
	private final FundingRepository fundingRepository;
	private final BusinessRepository businessRepository;
	private final BusinessMenuRepository businessMenuRepository;
	private final BookmarkService bookmarkService;
	private final CouponService couponService;

	@Override
	@Transactional
	public void createFunding(CreateFundingRequestDto createFundingRequestDto , User loginUser) {
		log.info("FundingServiceImpl_createFunding || 업주가 펀딩을 생성");

		Business business = businessRepository.findByUser(loginUser).orElseThrow(NotExistBusinessException::new);

		for (MenuRequestDto menuRequestDto : createFundingRequestDto.getMenuRequestDtos()) {
			BusinessMenu businessMenu = businessMenuRepository.findById(menuRequestDto.getMenuId()).get();
			fundingRepository.save(createFundingRequestDto.createFunding(business,businessMenu,menuRequestDto.getDiscountPrice()));
		}
	}

	@Override
	@Transactional
	public void applyFunding(Long fundingId ,User loginUser) {
		log.info("FundingServiceImpl_applyFunding ||  펀딩 참여");
		Funding funding = fundingRepository.findByIdWithLock(fundingId).orElseThrow(NotExistFundingException::new);
		fundingValidation(funding,loginUser);

		funding.addUserFunding(funding,loginUser);
		loginUser.spendMoney(funding.getFundingDiscountPrice());
		funding.addMoneyForApply();
		funding.addCountForApply();

		if(!funding.isMaxLimit())
			return;

		funding.changeFundingStatusByMaxApply();
		couponService.createCoupon(funding);
		// TODO : HISTORY 생성
	}

	@Override
	@Transactional
	public void cancelFunding(Long fundingId , User loginUser) {
		log.info("FundingServiceImpl_cancelFunding ||  펀딩 참여 취소");

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
	public FundingResponseDto getFunding(Long fundingId , User loginUser) {
		log.info("FundingServiceImpl_getFunding ||  펀딩 조회");

		Funding funding = fundingRepository.findById(fundingId).orElseThrow(NotExistFundingException::new);

		boolean isBookmark = loginUser == null ? false : bookmarkService.isBookmark(loginUser,funding);
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

		if(!loginUser.haveMoney(funding.getFundingDiscountPrice()))
			throw new LackPointUserFundingException();
	}

	@Override
	public Page<FundingListResponseDto> getUserFundingList(User user, int page) {
		log.info("FundingServiceImpl_getUserFundingList ||  유저가 참여한 펀딩 리스트 조회");
		Pageable pageable = PageRequest.of(page, 6 , Sort.by(Sort.Direction.DESC, "createdDate"));
		Page<UserFunding> userFundings = userFundingRepository.findByUser(user, pageable);

		List<FundingListResponseDto> result =
				userFundings.getContent()
				.stream()
				.map(userFunding -> {
					Funding funding = userFunding.getFunding();
					return funding.toFundingListResponseDto(bookmarkService.isBookmark(user, funding));
				}).collect(Collectors.toList());

		if(userFundings.getTotalPages() <= page)
			throw new NotExistPageFundingException();

		return new PageImpl<>(result, pageable, userFundings.getTotalElements());
	}

	@Override
	public Page<FundingListResponseDto> getUserFundingListByBookmark(User user, int page) {
		log.info("FundingServiceImpl_getUserFundingListByBookmark ||  유저가 좋아요한 펀딩 리스트 조회");
		Pageable pageable = PageRequest.of(page, 6 , Sort.by(Sort.Direction.DESC, "createdDate"));
		Page<Bookmark> userBookmarkFundingList = bookmarkService.getUserBookmarkFundingList(user, page, pageable);

		List<FundingListResponseDto> result = userBookmarkFundingList.getContent()
			.stream()
			.map(bookmark -> {
				Funding funding = bookmark.getFunding();
				return funding.toFundingListResponseDto(true);
			}).collect(Collectors.toList());

		if(userBookmarkFundingList.getTotalPages() <= page)
			throw new NotExistPageFundingException();

		return new PageImpl<>(result, pageable, userBookmarkFundingList.getTotalElements());
	}

	@Override
	public Page<FundingListResponseDto> searchFunding(SearchFundingRequestDto searchFundingRequestDto, User user) {
		log.info("FundingServiceImpl_searchFunding || 펀딩 검색");
		validateSearch(searchFundingRequestDto);

		Pageable pageable = PageRequest.of(searchFundingRequestDto.getPage(), 9);
		Page<Funding> searchFundingList = fundingRepository.findBySearchFundingRequestDto(
			searchFundingRequestDto, pageable);

		if(searchFundingList.getTotalPages() <= searchFundingRequestDto.getPage())
			throw new NotExistPageFundingException();

		return searchFundingList.map(funding -> funding.toFundingListResponseDto(bookmarkService.isBookmark(user,funding)));
	}

	@Override
	public List<FundingListResponseDto> getFundingByType(String type, User user) {
		log.info("FundingServiceImpl_getFundingByType || 홈 화면 종류별 펀딩 조회");
		validateSortType(type);

		return fundingRepository.findByType(type)
				.stream()
				.map(funding -> funding.toFundingListResponseDto(bookmarkService.isBookmark(user,funding)))
				.collect(Collectors.toList());
	}

	@Override
	public Page<FundingListResponseDto> getFundingByCategory(String category, String sortType, int page, User user) {
		log.info("FundingServiceImpl_getFundingByCategory || 홈 화면 음식 카테고리별 펀딩 조회");
		Pageable pageable = PageRequest.of(page, 9);
		Page<Funding> fundingList = fundingRepository.findByCategory(category, sortType, pageable);

		validateSortType(sortType);
		validateCategoryType(category);

		if(fundingList.getTotalPages() <= page)
			throw new NotExistPageFundingException();

		return fundingList.map(funding -> funding.toFundingListResponseDto(bookmarkService.isBookmark(user,funding)));
	}

	@Override
	public Page<FundingListResponseDto> getFundingList(
		Long businessId,
		FundingIsActive state,
		int page,
		User loginUser
	) {
		Business business = businessRepository.findById(businessId).get();
		return fundingRepository.findByBusinessAndFundingIsActive(business, state, PageRequest.of(page, 6))
			.map(funding -> funding.toFundingListResponseDto(
				bookmarkService.isBookmark(loginUser, funding)
			));
	}

	private void validateSearch(SearchFundingRequestDto searchFundingRequestDto){
		searchFundingRequestDto.getSearchType().stream().forEach(searchType -> validateSearchType(searchType));
		searchFundingRequestDto.getCategory().stream().forEach(category -> validateCategoryType(category));
		validateSortType(searchFundingRequestDto.getSortType());
		validateBlankKeyword(searchFundingRequestDto.getKeyword());
	}

	private void validateSortType(String sortType) {
		if (sortType.equals(FundingSortType.POPULARITY.name())
			|| sortType.equals(FundingSortType.CLOSING_SOON.name())
			|| sortType.equals(FundingSortType.LOW_PRICE.name())
			|| sortType.equals(FundingSortType.HIGH_DISCOUNT_RATE.name())) return;

		throw new InvalidSortTypeException();
	}

	private void validateSearchType(String searchType){
		if (searchType.equals(FundingSearchType.FUNDING_MENU.name())
			|| searchType.equals(FundingSearchType.FUNDING_TAG.name())
			|| searchType.equals(FundingSearchType.BUSINESS_NAME.name())) return;

		throw new InvalidSearchTypeException();
	}

	private void validateCategoryType(String categoryType){
		if (categoryType.equals(FundingCategory.ASIAN.name())
			|| categoryType.equals(FundingCategory.CHINESE.name())
			|| categoryType.equals(FundingCategory.CAFE_DESSERT.name())
			|| categoryType.equals(FundingCategory.WESTERN.name())
			|| categoryType.equals(FundingCategory.JAPANESE_SUSHI.name())
			|| categoryType.equals(FundingCategory.KOREAN.name())
			|| categoryType.equals(FundingCategory.SNACKS_LATE_NIGHT.name())
			|| categoryType.equals(FundingCategory.CHICKEN_BURGER.name())) return;

		throw new InvalidCategoryTypeException();
	}

	private void validateBlankKeyword(String keyword) {
		if (keyword.isBlank()) throw new BlankSearchKeywordException();
	}
}
