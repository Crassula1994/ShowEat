package com.ssafy.showeat.domain.business.service;

import java.io.IOException;
import java.util.List;

import com.ssafy.showeat.domain.business.dto.request.BusinessUserRequestDto;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessMenuResponseDto;

public interface BusinessService {
	void registMenu(RegistMenuRequestDto registMenuRequestDto , List<MultipartFile> multipartFiles) throws IOException;
	BusinessMenuResponseDto getMenuInfo(Long menuId);
	List<BusinessMenuResponseDto> getMenuList();
    void registerBusinessUser(BusinessUserRequestDto businessUserRequestDto, MultipartFile businessRegistration, MultipartFile bankBook) throws IOException;
}
