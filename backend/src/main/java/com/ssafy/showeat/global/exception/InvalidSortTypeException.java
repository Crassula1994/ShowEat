package com.ssafy.showeat.global.exception;

public class InvalidSortTypeException extends RuntimeException{
	public InvalidSortTypeException() {
		super(ExceptionCode.INVALID_SORT_TYPE_EXCEPTION.getErrorMessage());
	}

	public InvalidSortTypeException(String message) {
		super(message);
	}
}
