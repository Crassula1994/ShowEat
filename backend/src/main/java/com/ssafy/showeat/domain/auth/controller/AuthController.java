package com.ssafy.showeat.domain.auth.controller;


import com.ssafy.showeat.domain.auth.dto.TokenDto;
import com.ssafy.showeat.domain.auth.dto.request.LogoutReqDto;
import com.ssafy.showeat.domain.auth.dto.request.UserDeleteReqDto;
import com.ssafy.showeat.domain.auth.dto.response.LoginResponseDto;
import com.ssafy.showeat.domain.auth.service.AuthService;
import com.ssafy.showeat.domain.auth.service.KakaoAuthService;
import com.ssafy.showeat.domain.auth.service.RedisService;
import com.ssafy.showeat.domain.auth.util.HeaderUtil;
import com.ssafy.showeat.domain.auth.util.JwtProvider;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final KakaoAuthService kakaoAuthService;
    private final AuthService authService;
    private final RedisService redisService;
    private final HeaderUtil headerUtil;
    private final JwtProvider jwtProvider;

    @ApiOperation(value = "카카오 로그인", notes = "사용자가 카카오 로그인 합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 400, message = "로그인 실패"),
    })
    @GetMapping("/login/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request) {
        log.info("AuthController_kakaoLogin -> 카카오 로그인");
        String code = request.getParameter("code");
        LoginResponseDto loginResponseDto = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok().headers(headerUtil.setTokenHeaders(loginResponseDto.getTokenDto()))
                .body(new SingleResponseResult<>(loginResponseDto.getUserResDto()));
    }

    @ApiOperation(value = "카카오 로그아웃", notes = "사용자가 로그아웃합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "로그아웃 성공"),
            @ApiResponse(code = 400, message = "로그아웃 실패"),
    })
    @PatchMapping("/logout")
    public ResponseResult logout(@RequestBody LogoutReqDto logoutReqDto) {
        log.info("AuthController_logout -> 카카오 로그아웃");
        authService.logout(logoutReqDto);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "카카오 계정 탈퇴", notes = "사용자가 서비스를 탈퇴합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "탈퇴 성공"),
            @ApiResponse(code = 400, message = "탈퇴 실패"),
    })
    @DeleteMapping("/delete")
    public ResponseResult deleteUser(@RequestBody UserDeleteReqDto userDeleteReqDto) {
        log.info("AuthController_deleteUser -> 카카오 계정 탈퇴");
        authService.deleteUser(userDeleteReqDto);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "AccessToken 재발급", notes = "사용자의 AccessToken을 재발급합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "AccessToken 재발급 성공"),
            @ApiResponse(code = 400, message = "AccessToken 재발급 실패"),
    })
    @PostMapping("/reissue")
    public ResponseResult reissue(HttpServletRequest request, HttpServletResponse response) {
        log.info("AuthController_reissue -> AccessToken 재발행");
        authService.reissueToken(request, response);
        return ResponseResult.successResponse;
    }

    @ApiOperation(value = "Access Token 유효성 검사", notes = "사용자의 Access Token을 검사합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Access Token이 유효합니다."),
            @ApiResponse(code = 430, message = "Access Token이 유효하지 않습니다."),
    })
    @GetMapping("/validateToken")
    public ResponseEntity validateToken(HttpServletRequest request) {
        log.info("Access Token 유효성 검사 중");
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7);
            if (jwtProvider.validateToken(accessToken)) {
                return ResponseEntity.ok(ResponseResult.successResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseResult.builder().messages("만료된 토큰입니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseResult.builder().messages("만료된 토큰입니다."));
        }
    }
}