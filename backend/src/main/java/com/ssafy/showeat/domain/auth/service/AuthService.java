package com.ssafy.showeat.domain.auth.service;

import com.ssafy.showeat.domain.auth.dto.TokenDto;
import com.ssafy.showeat.domain.auth.dto.request.LogoutReqDto;
import com.ssafy.showeat.domain.auth.dto.request.UserDeleteReqDto;
import com.ssafy.showeat.domain.auth.util.JwtProvider;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.InvalidRefreshTokenException;
import com.ssafy.showeat.global.exception.NotExistUserException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CredentialRepository credentialRepository;
    private final RedisService redisService;
    private final JwtProvider jwtProvider;

    @Transactional
    public void logout(LogoutReqDto logoutReqDto){
        User user = userRepository.findByUserId(
                logoutReqDto.getUserId()).orElseThrow(NotExistUserException::new);

        Credential credential = credentialRepository.findByCredentialId(
                user.getCredential().getCredentialId()).orElseThrow(NotExistUserException::new);// TODO : 예외처리

        //redis 에서 refreshToken 삭제
        redisService.delValues(credential.getEmail());

        log.info("{} 님의 로그아웃 요청이 정상적으로 처리되었습니다.", user.getUserNickname());
    }

    @Transactional
    public void deleteUser(UserDeleteReqDto userDeleteReqDto){
        User user = userRepository.findByUserId(
                userDeleteReqDto.getUserId()).orElseThrow(NotExistUserException::new);

        Credential credential = credentialRepository.findByCredentialId(
                user.getCredential().getCredentialId()).orElseThrow(NotExistUserException::new);// TODO : 예외처리

        credentialRepository.deleteCredentialByCredentialId(user.getCredential().getCredentialId());
        userRepository.deleteUserByUserId(user.getUserId());
        log.info("{} 님의 회원 탈퇴가 완료되었습니다.", user.getUserNickname());
    }

    @Transactional
    public String reissueToken(HttpServletRequest request, HttpServletResponse response) {
        log.info("AuthService_reissueToken -> AccessToken 재발행");
        String refreshToken = request.getHeader("refresh-token");

        // refreshToken 해독
        Claims refreshTokenClaims = jwtProvider.parseClaims(refreshToken);
        String email = refreshTokenClaims.getSubject();

        log.info("해독해서 뽑은 이메일 : " + email);
        String findRefreshToken = redisService.getValues(email + "_refreshToken");

        if (findRefreshToken != null) {
            log.info(email + "님의 refreshToken : " + findRefreshToken);
            TokenDto newAccessToken = jwtProvider.generateTokenDto(findRefreshToken);
            // 엑세스 토큰 재발행
            response.setHeader("access-token", newAccessToken.getAccessToken());
            log.info(email + "님의 accessToken 재발급 : " + newAccessToken.getAccessToken());
            return newAccessToken.getAccessToken();
        } else {
            log.info("유효하지 않거나 만료된 리프레시 토큰");
            // 유효하지 않거나 만료된 리프레시 토큰
            new InvalidRefreshTokenException();
            return null;
        }
    }
}
