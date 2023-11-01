package com.ssafy.showeat.domain.business.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.showeat.domain.business.dto.request.BusinessUserRequestDto;
import com.ssafy.showeat.domain.business.dto.response.*;
import com.ssafy.showeat.global.exception.ImpossibleDeleteMenuException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.s3.S3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class BusinessServiceImpl implements BusinessService {

	private final UserRepository userRepository;
	private final BusinessRepository businessRepository;
	private final BusinessMenuRepository businessMenuRepository;
	private final FundingRepository fundingRepository;
	private final S3Service s3Service;

	@Override
	@Transactional
	public void registerBusinessUser(BusinessUserRequestDto businessUserRequestDto,
		MultipartFile businessRegistration,
		MultipartFile bankBook) throws IOException {
		log.info("BusinessServiceImpl_registerBusinessUser || 업체 등록");
		//todo 회원 Id 가져오기
		User loginUser = userRepository.findById(1L).get();
		String businessRegistrationUrl = s3Service.uploadImageToS3(businessRegistration);
		String bankBookUrl = s3Service.uploadImageToS3(bankBook);
		businessRepository.save(businessUserRequestDto.toEntity(businessRegistrationUrl, bankBookUrl, loginUser));
	}

	@Override
	public RegistrationResponseDto getRegistrationInfo(Long businessId) {
		log.info("BusinessServiceImpl_getSellerInfo || 사업자 정보 조회");
		return businessRepository.findById(businessId).get().toRegistrationResponseDto();
	}

	@Override
	public SellerResponseDto getSellerInfo(Long businessId) {
		log.info("BusinessServiceImpl_getSellerInfo || 셀러 정보 조회");
		return businessRepository.findBusinessWithBusinessMenusByBusinessId(businessId).toSellerResponseDto();
	}

	@Override
	@Transactional
	public void updateBusinessImg(MultipartFile businessImg) throws IOException {
		log.info("BusinessServiceImpl_updateBusinessImg || 셀러 프로필 변경");
		//todo 회원 Id 가져오기
		User loginUser = userRepository.findById(1L).get();
		Business business = businessRepository.findByUser(loginUser).get();
		String businessImgUrl = s3Service.uploadImageToS3(businessImg);
		business.updateImgUrl(businessImgUrl);
	}

	@Override
	@Transactional
	public void updateBusinessBio(String businessBio) {
		log.info("BusinessServiceImpl_updateBusinessBio || 셀러 소개 변경");
		//todo 회원 Id 가져오기
		User loginUser = userRepository.findById(1L).get();
		Business business = businessRepository.findByUser(loginUser).get();
		business.updateBio(businessBio);
	}

	@Override
	@Transactional
	public void updateBusinessOperatingTime(String operatingTime) {
		log.info("BusinessServiceImpl_updateBusinessOperatingTime || 셀러 운영시간 변경");
		//todo 회원 Id 가져오기
		User loginUser = userRepository.findById(1L).get();
		Business business = businessRepository.findByUser(loginUser).get();
		business.updateOperatingTime(operatingTime);
	}

	@Override
	@Transactional
	public void updateBusinessClosedDays(String businessClosedDays) {
		log.info("BusinessServiceImpl_updateBusinessClosedDays || 셀러 휴무일 변경");
		//todo 회원 Id 가져오기
		User loginUser = userRepository.findById(1L).get();
		Business business = businessRepository.findByUser(loginUser).get();
		business.updateClosedDays(businessClosedDays);
	}

	@Override
	@Transactional
	public void registMenu(RegistMenuRequestDto registMenuRequestDto, List<MultipartFile> multipartFiles , User loginUser) throws
		IOException {
		log.info("BusinessServiceImpl_registMenu || 업체 메뉴 등록");

		Business business = businessRepository.findByUser(loginUser).get();
		BusinessMenu businessMenu = s3Service.uploadMenuImageToS3(registMenuRequestDto.toEntity(), multipartFiles);
		business.addBusinessMenu(businessMenu);
	}

	@Override
	public BusinessMenuResponseDto getMenuInfo(Long menuId) {
		log.info("BusinessServiceImpl_getMenuInfo || 업체 메뉴 조회");
		return businessMenuRepository.findById(menuId).get().toBusinessMenuResponseDto();
	}

	@Override
	public List<BusinessMenuResponseDto> getMenuList(User loginUser) {
		log.info("BusinessServiceImpl_getMenuInfo || 업체 메뉴 리스트 조회");

		Business business = businessRepository.findByUser(loginUser).get();
		return business.getBusinessMenus()
			.stream()
			.map(businessMenu -> businessMenu.toBusinessMenuResponseDto())
			.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void deleteMenu(Long menuId) {
		log.info("BusinessServiceImpl_deleteMenu || 업체 메뉴 삭제");
		User loginUser = userRepository.findById(1L).get();
		Business business = businessRepository.findByUser(loginUser).get();
		BusinessMenu businessMenu = businessMenuRepository.findById(menuId).get();

		//본인이면 삭제
		if(businessMenu.getBusiness().equals(business)){
			businessMenuRepository.delete(businessMenu);
			return;
		}

		throw new ImpossibleDeleteMenuException();
	}

	@Override
	public List<BusinessMonthlyStatResponseDto> getMonthlyStatistic(Long businessId) {
		log.info("BusinessServiceImpl_getMonthlyStatList || 업체 월간 통계 조회");
		return fundingRepository.findMonthlyStatListById(businessId);
	}

	@Override
	public BusinessTotalStatResponseDto getTotalStatistic(Long businessId) {
		log.info("BusinessServiceImpl_getTotalStatList || 업체 누적 통계 조회");
		return fundingRepository.findTotalStatById(businessId);
	}
}
