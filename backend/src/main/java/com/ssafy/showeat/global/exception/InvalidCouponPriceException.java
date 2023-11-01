package com.ssafy.showeat.global.exception;

public class InvalidCouponPriceException extends RuntimeException{
    public InvalidCouponPriceException() {
        super(ExceptionCode.INVALID_COUPON_PRICE_EXCEPTION.getErrorMessage());
    }

    public InvalidCouponPriceException(String message) {
        super(message);
    }
}

