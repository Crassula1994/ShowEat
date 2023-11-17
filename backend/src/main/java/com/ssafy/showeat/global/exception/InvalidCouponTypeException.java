package com.ssafy.showeat.global.exception;

public class InvalidCouponTypeException extends RuntimeException{
    public InvalidCouponTypeException() {
        super(ExceptionCode.INVALID_COUPON_TYPE_EXCEPTION.getErrorMessage());
    }

    public InvalidCouponTypeException(String message) {
        super(message);
    }
}

