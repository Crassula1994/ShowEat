package com.ssafy.showeat.domain.user.controller;

import com.ssafy.showeat.domain.user.dto.request.UpdateAddressRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.showeat.domain.user.dto.response.UserResponseDto;
import com.ssafy.showeat.domain.user.service.UserService;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/users")
@RestController
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "사용자 조회" , notes = "사용자가 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "정보조회 성공"),
            @ApiResponse(code = 400, message = "정보조회 실패"),
    })
    @GetMapping("/{userId}")
    public ResponseResult getUser(@PathVariable Long userId) {
        log.info("UserController_getUser -> 사용자 정보 조회");
        UserResponseDto userResponseDto = userService.getUserById(userId);
        return new SingleResponseResult<>(userResponseDto);
    }

    @ApiOperation(value = "닉네임 수정" , notes = "사용자가 닉네임을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "닉네임 수정 성공"),
            @ApiResponse(code = 400, message = "닉네임 수정 실패"),
    })
    @PatchMapping("/nickname")
    public ResponseResult updateNickname(@Valid @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
        log.info("UserController_updateNickname -> 사용자 닉네임 수정");
        userService.updateNickname(updateNicknameRequestDto);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "프로필사진 수정" , notes = "사용자가 프로필사진을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "프로필사진 수정 성공"),
            @ApiResponse(code = 400, message = "프로필사진 수정 실패"),
    })
    @PatchMapping("/update-profile-image")
    public ResponseResult updateImage(@RequestParam("files") List<MultipartFile> multipartFiles, @RequestParam("userId") Long userId) {
        log.info("UserController_updateImage -> 사용자 프로필 사진 수정");
        userService.updateuserImgUrl(multipartFiles, userId);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "카카오 로그아웃" , notes = "사용자가 로그아웃합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "로그아웃 성공"),
            @ApiResponse(code = 400, message = "로그아웃 실패"),
    })
    @PatchMapping("/address")
    public ResponseResult updateAddress(@Valid @RequestBody UpdateAddressRequestDto updateAddressRequestDto){
        log.info("UserController_updateAddress -> 사용자 관심지역 수정");
        userService.updateAddress(updateAddressRequestDto);
        return ResponseResult.successResponse;
    }
}
