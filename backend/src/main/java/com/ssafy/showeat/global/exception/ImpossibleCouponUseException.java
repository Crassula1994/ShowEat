package com.ssafy.showeat.global.exception;

public class ImpossibleCouponUseException extends RuntimeException{
	public ImpossibleCouponUseException() {
		super(ExceptionCode.IMPOSSIBLE_COUPON_USE_EXCEPTION.getErrorMessage());
	}

	public ImpossibleCouponUseException(String message) {
		super(message);
	}
}
