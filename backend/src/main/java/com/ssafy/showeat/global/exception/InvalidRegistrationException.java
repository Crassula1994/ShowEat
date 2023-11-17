package com.ssafy.showeat.global.exception;

public class InvalidRegistrationException extends RuntimeException {

	public InvalidRegistrationException() {
		super(ExceptionCode.INVALID_REGISTRATION_EXCEPTION.getErrorMessage());
	}

	public InvalidRegistrationException(String message) {
		super(message);
	}
}

