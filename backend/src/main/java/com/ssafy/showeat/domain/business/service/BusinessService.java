package com.ssafy.showeat.domain.business.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.showeat.domain.business.dto.request.RegistMenuRequestDto;

public interface BusinessService {
	void registMenu(RegistMenuRequestDto registMenuRequestDto , List<MultipartFile> multipartFiles) throws IOException;
}
