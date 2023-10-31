package com.ssafy.showeat.global.exception;

public class PaymentInvalidPriceException extends RuntimeException {
	public PaymentInvalidPriceException() {
		super(ExceptionCode.PAYMENT_INVALID_PRICE_EXCEPTION.getErrorMessage());
	}

	public PaymentInvalidPriceException(String message) {
		super(message);
	}

}
