package com.ssafy.showeat.global.exception;

public class InvalidCategoryTypeException extends RuntimeException{
	public InvalidCategoryTypeException() {
		super(ExceptionCode.INVALID_CATEGORY_TYPE_EXCEPTION.getErrorMessage());
	}

	public InvalidCategoryTypeException(String message) {
		super(message);
	}
}
