package com.ssafy.showeat.global.exception;

public class NotExistCouponException extends RuntimeException {
	public NotExistCouponException() {
		super(ExceptionCode.NOT_EXIST_COUPON_EXCEPTION.getErrorMessage());
	}

	public NotExistCouponException(String message) {
		super(message);
	}
}
