package com.ssafy.showeat.global.exception;

public class PaymentInvalidOrderAmountException extends RuntimeException{
	public PaymentInvalidOrderAmountException() {
		super(ExceptionCode.PAYMENT_INVALID_ORDER_AMOUNT_EXCEPTION.getErrorMessage());
	}

	public PaymentInvalidOrderAmountException(String message) {
		super(message);
	}
}