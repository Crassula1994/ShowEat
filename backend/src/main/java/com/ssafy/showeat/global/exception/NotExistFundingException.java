package com.ssafy.showeat.global.exception;

public class NotExistFundingException extends RuntimeException{
	public NotExistFundingException() {
		super(ExceptionCode.NOT_EXIST_FUNDING_EXCEPTION.getErrorMessage());
	}

	public NotExistFundingException(String message) {
		super(message);
	}
}
