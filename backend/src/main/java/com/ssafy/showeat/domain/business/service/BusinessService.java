package com.ssafy.showeat.domain.business.service;

import java.io.IOException;
import java.util.List;

import com.ssafy.showeat.domain.business.dto.request.BusinessUserRequestDto;

import com.ssafy.showeat.domain.business.dto.response.*;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.user.entity.User;

public interface BusinessService {

	void updateBusinessImg(MultipartFile businessImg) throws IOException;

	void registMenu(RegistMenuRequestDto registMenuRequestDto, List<MultipartFile> multipartFiles , User user) throws IOException;

	BusinessMenuResponseDto getMenuInfo(Long menuId);

	List<BusinessMenuResponseDto> getMenuList(User user);

	SellerResponseDto getSellerInfo(Long businessId);

	List<BusinessMonthlyStatResponseDto> getMonthlyStatistic(Long businessId);

	void deleteMenu(Long menuId);

	BusinessTotalStatResponseDto getTotalStatistic(Long businessId);

	void registerBusinessUser(BusinessUserRequestDto businessUserRequestDto, MultipartFile businessRegistration,
		MultipartFile bankBook) throws IOException;

	RegistrationResponseDto getRegistrationInfo(Long businessId);

	void updateBusinessBio(String businessBio);

	void updateBusinessOperatingTime(String operatingTime);

	void updateBusinessClosedDays(String businessClosedDays);

}
