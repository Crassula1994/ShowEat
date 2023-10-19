package com.ssafy.showeat.global.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.showeat.global.response.ResponseResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.ssafy.showeat")
public class ExceptionController {

	@ExceptionHandler(ServerException.class)
	public ResponseResult ServerException(ServerException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.SERVER_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(NotExistUserException.class)
	public ResponseResult NotExistUserException(NotExistUserException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_USER_EXCEPTION, err.getMessage());
	}
}
