package com.ssafy.showeat.domain.user.controller;

import com.ssafy.showeat.domain.user.dto.request.UpdateAddressRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.showeat.domain.user.dto.response.UserResponseDto;
import com.ssafy.showeat.domain.user.service.UserService;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseResult getUser(@PathVariable Long userId) {
        log.info("UserController_getUser -> 사용자 정보 조회");
        UserResponseDto userResponseDto = userService.getUserById(userId);
        return new SingleResponseResult<>(userResponseDto);
    }

    @PatchMapping("/nickname")
    public ResponseResult updateNickname(@Valid @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
        log.info("UserController_updateNickname -> 사용자 닉네임 수정");
        userService.updateNickname(updateNicknameRequestDto);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/update-profile-image")
    public ResponseResult updateImage(@RequestParam("files") List<MultipartFile> multipartFiles, @RequestParam("userId") Long userId) {
        log.info("UserController_updateImage -> 사용자 프로필 사진 수정");
        userService.updateuserImgUrl(multipartFiles, userId);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/address")
    public ResponseResult updateAddress(@Valid @RequestBody UpdateAddressRequestDto updateAddressRequestDto){
        log.info("UserController_updateAddress -> 사용자 관심지역 수정");
        userService.updateAddress(updateAddressRequestDto);
        return ResponseResult.successResponse;
    }
}
