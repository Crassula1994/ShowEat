package com.ssafy.showeat.global.exception;

public class NotExistPaymentException extends RuntimeException{
	public NotExistPaymentException() {
		super(ExceptionCode.NOT_EXIST_PAYMENT_EXCEPTION.getErrorMessage());
	}

	public NotExistPaymentException(String message) {
		super(message);
	}
}
