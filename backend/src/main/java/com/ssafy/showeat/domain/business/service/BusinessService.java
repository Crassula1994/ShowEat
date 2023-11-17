package com.ssafy.showeat.domain.business.service;

import java.io.IOException;
import java.util.List;

import com.ssafy.showeat.domain.business.dto.request.RegistrationRequestDto;
import com.ssafy.showeat.domain.business.dto.request.AccountInfoRequestDto;

import com.ssafy.showeat.domain.business.dto.response.*;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.user.entity.User;

public interface BusinessService {

	String updateBusinessImg(MultipartFile businessImg , User user) throws IOException;

	void registMenu(RegistMenuRequestDto registMenuRequestDto, List<MultipartFile> multipartFiles , User user) throws IOException;

	BusinessMenuResponseDto getMenuInfo(Long menuId);

	List<BusinessMenuResponseDto> getMenuList(User user);

	SellerResponseDto getSellerInfo(Long businessId);

	List<BusinessMonthlyStatResponseDto> getMonthlyStatistic(Long businessId);

	void deleteMenu(Long menuId , User user);

	BusinessTotalStatResponseDto getTotalStatistic(Long businessId);

	RegistrationResponseDto getRegistrationInfo(Long businessId);

	void updateBusinessBio(String businessBio , User user);

	void updateBusinessOperatingTime(String operatingTime , User user);

	void updateBusinessClosedDays(String closedDays , User user);

	boolean verifyBusiness(RegistrationRequestDto registrationRequestDto, MultipartFile businessRegistration,
		User userFromRequest) throws IOException;

	SellerResponseDto registerAccount(AccountInfoRequestDto accountInfoRequestDto, MultipartFile bankBook, User user) throws
		IOException;
}
