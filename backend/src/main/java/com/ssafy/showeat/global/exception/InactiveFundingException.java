package com.ssafy.showeat.global.exception;

public class InactiveFundingException extends RuntimeException{
	public InactiveFundingException() {
		super(ExceptionCode.INACTIVE_FUNDING_EXCEPTION.getErrorMessage());
	}

	public InactiveFundingException(String message) {
		super(message);
	}
}
