package com.ssafy.showeat.domain.user.service;

import com.ssafy.showeat.domain.user.dto.request.UpdateInfoRequestDto;
import com.ssafy.showeat.global.s3.dto.S3FileDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateAddressRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.showeat.domain.user.dto.response.UserResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {
    //내 정보 조회
    UserResponseDto getUserById(Long userId);
    //닉네임 변경
    void updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto);
    //프로필 사진 변경
    List<S3FileDto> updateuserImgUrl(List<MultipartFile> multipartFiles, Long userId);
    //프로필 사진 삭제
    void deleteuserImgUrl(Long userId);
    //관심 주소 변경
    void updateAddress(UpdateAddressRequestDto updateAddressRequestDto);
    //초기 설정 등록
    void updateInfo(UpdateInfoRequestDto updateInfoRequestDto);

}
