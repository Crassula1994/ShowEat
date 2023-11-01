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
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseResult ExpiredTokenException(ExpiredTokenException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.EXPIRED_TOKEN_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(UnAuthorizedAccessException.class)
    public ResponseResult UnAuthorizedAccessException(UnAuthorizedAccessException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.UNAUTHORIZED_ACCESS_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(WrongTokenException.class)
    public ResponseResult WrongTokenException(WrongTokenException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.WRONG_TOKEN_EXCEPTION, err.getMessage());
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

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseResult InvalidRefreshTokenException(InvalidRefreshTokenException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(ImpossibleDeleteMenuException.class)
    public ResponseResult ImpossibleDeleteMenuException(ImpossibleDeleteMenuException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.IMPOSSIBLE_DELETE_MENU_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(PaymentInvalidPriceException.class)
    public ResponseResult PaymentInvalidPriceException(PaymentInvalidPriceException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.PAYMENT_INVALID_PRICE_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(PaymentInvalidPayTypeException.class)
    public ResponseResult PaymentInvalidPayTypeException(PaymentInvalidPayTypeException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.PAYMENT_INVALID_PAY_TYPE_EXCEPTION, err.getMessage());
    }
    @ExceptionHandler(PaymentInvalidOrderAmountException.class)
    public ResponseResult PaymentInvalidOrderAmountException(PaymentInvalidOrderAmountException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.PAYMENT_INVALID_ORDER_AMOUNT_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(NotExistPaymentException.class)
    public ResponseResult NotExistPaymentException(NotExistPaymentException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_PAYMENT_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(NotExistPageFundingException.class)
    public ResponseResult NotExistPageFundingException(NotExistPageFundingException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.NOT_EXIST_PAGE_FUNDING_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(InvalidRegistrationException.class)
    public ResponseResult InvalidRegistrationException(InvalidRegistrationException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_REGISTRATION_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(ClovaOcrException.class)
    public ResponseResult ClovaOcrException(ClovaOcrException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.CLOVA_OCR_EXCEPTION, err.getMessage());

    @ExceptionHandler(InvalidCouponTypeException.class)
    public ResponseResult InvalidCouponTypeException(InvalidCouponTypeException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_COUPON_TYPE_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(InvalidCouponPriceException.class)
    public ResponseResult InvalidCouponPriceException(InvalidCouponPriceException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_COUPON_PRICE_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(InvalidSearchTypeException.class)
    public ResponseResult InvalidSearchTypeException(InvalidSearchTypeException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_SEARCH_TYPE_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(InvalidSortTypeException.class)
    public ResponseResult InvalidSortTypeException(InvalidSortTypeException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_SORT_TYPE_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(InvalidCategoryTypeException.class)
    public ResponseResult InvalidCategoryTypeException(InvalidCategoryTypeException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.INVALID_CATEGORY_TYPE_EXCEPTION, err.getMessage());
    }

    @ExceptionHandler(BlankSearchKeywordException.class)
    public ResponseResult BlankSearchKeywordException(BlankSearchKeywordException err) {
        log.info("Error : {}", err.getClass());
        log.info("Error Message : {}", err.getMessage());
        return ResponseResult.exceptionResponse(ExceptionCode.BLANK_SEARCH_KEYWORD_EXCEPTION, err.getMessage());
    }

}
