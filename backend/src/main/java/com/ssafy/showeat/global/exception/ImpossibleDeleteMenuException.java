package com.ssafy.showeat.global.exception;

public class ImpossibleDeleteMenuException extends RuntimeException {

	public ImpossibleDeleteMenuException() {
		super(ExceptionCode.IMPOSSIBLE_DELETE_MENU_EXCEPTION.getErrorMessage());
	}

	public ImpossibleDeleteMenuException(String message) {
		super(message);
	}
}
