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

	@ExceptionHandler(NotExistBusinessException.class)
	public ResponseResult NotExistBusinessException(NotExistBusinessException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_BUSINESS_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(NotExistCouponException.class)
	public ResponseResult NotExistCouponException(NotExistCouponException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_COUPON_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(NotExistUserException.class)
	public ResponseResult NotExistUserException(NotExistUserException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_USER_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(NotExistFundingException.class)
	public ResponseResult NotExistFundingException(NotExistFundingException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_FUNDING_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(ImpossibleApplyFundingException.class)
	public ResponseResult ImpossibleApplyFundingException(ImpossibleApplyFundingException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.IMPOSSIBLE_APPLY_FUNDING_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(InactiveFundingException.class)
	public ResponseResult InactiveFundingException(InactiveFundingException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.INACTIVE_FUNDING_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(DuplicationApplyFundingException.class)
	public ResponseResult DuplicationApplyFundingException(DuplicationApplyFundingException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.DUPLICATION_APPLY_FUNDING_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(LackPointUserFundingException.class)
	public ResponseResult LackPointUserFundingException(LackPointUserFundingException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.LACK_POINT_USER_FUNDING_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(ImpossibleCancelFundingException.class)
	public ResponseResult ImpossibleCancelFundingException(ImpossibleCancelFundingException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.IMPOSSIBLE_CANCEL_FUNDING_EXCEPTION, err.getMessage());
	}

	@ExceptionHandler(ImpossibleReviewException.class)
	public ResponseResult ImpossibleReviewException(ImpossibleReviewException err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.IMPOSSIBLE_REVIEW_EXCEPTION, err.getMessage());
	}
}
