package com.ssafy.showeat.global.exception;

public class PaymentInvalidPayTypeException extends RuntimeException{
	public PaymentInvalidPayTypeException() {
		super(ExceptionCode.PAYMENT_INVALID_PAY_TYPE_EXCEPTION.getErrorMessage());
	}

	public PaymentInvalidPayTypeException(String message) {
		super(message);
	}
}