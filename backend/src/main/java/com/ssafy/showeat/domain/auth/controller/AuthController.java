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
import io.jsonwebtoken.Claims;
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

    @GetMapping("/login/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request) {
        log.info("AuthController_kakaoLogin -> 카카오 로그인");
        String code = request.getParameter("code");
        LoginResponseDto loginResponseDto = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok().headers(headerUtil.setTokenHeaders(loginResponseDto.getTokenDto()))
                .body(new SingleResponseResult<>(loginResponseDto.getUserResDto()));
    }

    @PatchMapping("/logout")
    public ResponseResult logout(@RequestBody LogoutReqDto logoutReqDto) {
        log.info("AuthController_logout -> 카카오 로그아웃");
        authService.logout(logoutReqDto);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete")
    public ResponseResult deleteUser(@RequestBody UserDeleteReqDto userDeleteReqDto) {
        log.info("AuthController_deleteUser -> 카카오 계정 탈퇴");
        authService.deleteUser(userDeleteReqDto);
        return ResponseResult.successResponse;
    }

    @PostMapping("/reissue")
    public ResponseResult reissue(HttpServletRequest request, HttpServletResponse response) {
        log.info("AuthController_reissue -> AccessToken 재발행");
        authService.reissueToken(request, response);
        return ResponseResult.successResponse;
    }
}