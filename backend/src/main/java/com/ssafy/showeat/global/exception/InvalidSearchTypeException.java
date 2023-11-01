package com.ssafy.showeat.global.exception;

public class InvalidSearchTypeException extends RuntimeException{
	public InvalidSearchTypeException() {
		super(ExceptionCode.INVALID_SEARCH_TYPE_EXCEPTION.getErrorMessage());
	}

	public InvalidSearchTypeException(String message) {
		super(message);
	}
}
