package com.ssafy.showeat.global.exception;

public class NotExistBusinessException extends RuntimeException {
	public NotExistBusinessException() {
		super(ExceptionCode.NOT_EXIST_BUSINESS_EXCEPTION.getErrorMessage());
	}

	public NotExistBusinessException(String message) {
		super(message);
	}
}
