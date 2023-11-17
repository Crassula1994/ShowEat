package com.ssafy.showeat.domain.business.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.AccountInfoRequestDto;
import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.business.dto.request.RegistrationRequestDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessMenuResponseDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessTotalStatResponseDto;
import com.ssafy.showeat.domain.business.dto.response.RegistrationResponseDto;
import com.ssafy.showeat.domain.business.dto.response.SellerResponseDto;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.ImpossibleDeleteMenuException;
import com.ssafy.showeat.global.exception.InvalidRegistrationException;
import com.ssafy.showeat.global.exception.NotExistUserException;
import com.ssafy.showeat.global.response.ocr.ClovaOcrResponseDto;
import com.ssafy.showeat.global.response.ocr.FieldInfo;
import com.ssafy.showeat.global.response.ocr.ImageInfo;
import com.ssafy.showeat.global.s3.S3Service;
import com.ssafy.showeat.global.util.BusinessRegistrationService;
import com.ssafy.showeat.global.util.ClovaOcrService;

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
	private final ClovaOcrService clovaOcrService;
	private final BusinessRegistrationService businessRegistrationService;

	@Override
	@Transactional
	public SellerResponseDto registerAccount(
		AccountInfoRequestDto accountInfoRequestDto,
		MultipartFile bankBook,
		User user
	) throws IOException {
		String bankBookUrl = s3Service.uploadBusinessImageToS3(bankBook);
		user.getBusiness().updateAccountInfo(bankBookUrl,accountInfoRequestDto, user);
		return user.getBusiness().toSellerResponseDto();
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
	public String updateBusinessImg(MultipartFile businessImg, User loginUser) throws IOException {
		log.info("BusinessServiceImpl_updateBusinessImg || 셀러 프로필 변경");
		Business business = businessRepository.findByUser(loginUser).orElseThrow(NotExistUserException::new);
		String businessImgUrl = s3Service.uploadBusinessImageToS3(businessImg);
		business.updateImgUrl(businessImgUrl);
		return business.getBusinessImgUrl();
	}

	@Override
	@Transactional
	public void updateBusinessBio(String businessBio, User loginUser) {
		log.info("BusinessServiceImpl_updateBusinessBio || 셀러 소개 변경");
		Business business = businessRepository.findByUser(loginUser).orElseThrow(NotExistUserException::new);
		business.updateBio(businessBio);
	}

	@Override
	@Transactional
	public void updateBusinessOperatingTime(String operatingTime, User loginUser) {
		log.info("BusinessServiceImpl_updateBusinessOperatingTime || 셀러 운영시간 변경");
		Business business = businessRepository.findByUser(loginUser).orElseThrow(NotExistUserException::new);
		business.updateOperatingTime(operatingTime);
	}

	@Override
	@Transactional
	public void updateBusinessClosedDays(String businessClosedDays, User loginUser) {
		log.info("BusinessServiceImpl_updateBusinessClosedDays || 셀러 휴무일 변경");
		Business business = businessRepository.findByUser(loginUser).orElseThrow(NotExistUserException::new);
		business.updateClosedDays(businessClosedDays);
	}

	@Override
	@Transactional
	public void registMenu(RegistMenuRequestDto registMenuRequestDto, List<MultipartFile> multipartFiles,
		User loginUser) throws
		IOException {
		log.info("BusinessServiceImpl_registMenu || 업체 메뉴 등록");
		log.info(registMenuRequestDto.getMenu());

		for (MultipartFile multipartFile : multipartFiles) {
			log.info(multipartFile.getOriginalFilename());
		}

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
	public void deleteMenu(Long menuId, User loginUser) {
		log.info("BusinessServiceImpl_deleteMenu || 업체 메뉴 삭제");

		Business business = businessRepository.findByUser(loginUser).get();
		BusinessMenu businessMenu = businessMenuRepository.findById(menuId).get();

		//본인이면 삭제
		if (businessMenu.getBusiness().equals(business)) {
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

	@Override
	@Transactional
	public boolean verifyBusiness(
		RegistrationRequestDto registrationRequestDto,
		MultipartFile businessRegistration,
		User loginUser
	) throws IOException {
		//사업자 등록증 ocr
		ClovaOcrResponseDto clovaOcrResponseDto = clovaOcrService.readOcr(businessRegistration);

		//업체 입력 정보와 ocr 일치 확인
		checkOcrAndBusinessInfo(clovaOcrResponseDto, registrationRequestDto);

		//국세청 사업자등록정보 진위확인
		if (!businessRegistrationService.verifyBusinessRegistration(registrationRequestDto)) {
			return false;
		}

		//사업자 등록
		String businessRegistrationUrl = s3Service.uploadBusinessImageToS3(businessRegistration);
		if (loginUser.getBusiness() == null) {
			Business business = businessRepository.save(
				registrationRequestDto.toEntity(businessRegistrationUrl, loginUser));
			loginUser.updateBusiness(business);
		} else {
			loginUser.getBusiness().updateBusiness(registrationRequestDto, businessRegistrationUrl);
		}
		return true;
	}

	private void checkOcrAndBusinessInfo(ClovaOcrResponseDto clovaOcrResponseDto,
		RegistrationRequestDto registrationRequestDto) {
		List<ImageInfo> images = clovaOcrResponseDto.getImages();
		for (ImageInfo imageInfo : images) {
			List<FieldInfo> fields = imageInfo.getFields();
			FieldInfo businessNumber = fields.get(0);
			FieldInfo businessName = fields.get(1);
			FieldInfo businessCeo = fields.get(2);
			FieldInfo startDate = fields.get(3);

			if (!businessNumber.getInferText().replaceAll("[^\\d]", "")
				.equals(registrationRequestDto.getBusinessNumber())) {
				throw new InvalidRegistrationException("사업자등록번호가 일치하지 않습니다.");
			}
			if (!businessName.getInferText().equals(registrationRequestDto.getBusinessName())) {
				throw new InvalidRegistrationException("상호명이 일치하지 않습니다.");
			}
			if (!businessCeo.getInferText().equals(registrationRequestDto.getCeo())) {
				throw new InvalidRegistrationException("대표자명이 일치하지 않습니다.");
			}
			if (!startDate.getInferText().replaceAll("[^\\d]", "")
				.equals(registrationRequestDto.getStartDate())) {
				throw new InvalidRegistrationException("사업 시작일이 일치하지 않습니다.");
			}
		}
	}

}
