package com.ssafy.showeat.domain.user.controller;

import com.ssafy.showeat.domain.user.dto.request.UpdateAddressRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateInfoRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdatePhoneRequestDto;
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

    @ApiOperation(value = "사용자 조회", notes = "사용자가 정보를 조회합니다.")
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

    @ApiOperation(value = "초기 정보 설정", notes = "사용자가 회원가입 시 초기 정보를 설정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "초기설정 등록 성공"),
            @ApiResponse(code = 400, message = "초기설정 등록 실패"),
    })

    @PatchMapping("/setting-info")
    public ResponseResult setInfo(@Valid @RequestBody UpdateInfoRequestDto updateInfoRequestDto) {
        log.info("UserController_setInfo -> 사용자 초기 정보 설정");
        userService.updateInfo(updateInfoRequestDto);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "닉네임 수정", notes = "사용자가 닉네임을 수정합니다.")
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

    @ApiOperation(value = "프로필사진 수정", notes = "사용자가 프로필사진을 수정합니다.")
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

    @ApiOperation(value = "프로필사진 삭제", notes = "사용자가 프로필사진을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "프로필사진 삭제 성공"),
            @ApiResponse(code = 400, message = "프로필사진 삭제 실패"),
    })
    @PatchMapping("/delete-profile-image/{userId}")
    public ResponseResult deleteImage(@PathVariable Long userId) {
        log.info("UserController_deleteImage -> 사용자 프로필 사진 삭제");
        userService.deleteuserImgUrl(userId);
        return ResponseResult.successResponse;
    }


    @ApiOperation(value = "관심지역 수정", notes = "사용자가 관심지역을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "관심지역 수정 성공"),
            @ApiResponse(code = 400, message = "관심지역 수정 실패"),
    })
    @PatchMapping("/address")
    public ResponseResult updateAddress(@Valid @RequestBody UpdateAddressRequestDto updateAddressRequestDto) {
        log.info("UserController_updateAddress -> 사용자 관심지역 수정");
        userService.updateAddress(updateAddressRequestDto);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "전화번호 수정", notes = "사용자가 전화번호를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "사용자 전화번호 수정 성공"),
            @ApiResponse(code = 400, message = "사용자 전화번호 수정 실패"),
    })

    @PatchMapping("/phone")
    public ResponseResult updatePhone(@Valid @RequestBody UpdatePhoneRequestDto updatePhoneRequestDto) {
        log.info("UserController_updatePhone -> 사용자 전화번호 수정");
        userService.updatePhone(updatePhoneRequestDto);
        return ResponseResult.successResponse;
    }
}
