package com.ssafy.showeat.global.exception;

public class BusinessRegistrationException extends RuntimeException {

	public BusinessRegistrationException() {
		super(ExceptionCode.BUSINESS_REGISTRATION_EXCEPTION.getErrorMessage());
	}

	public BusinessRegistrationException(String message) {
		super(message);
	}
}

