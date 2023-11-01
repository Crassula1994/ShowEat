package com.ssafy.showeat.global.exception;

public class BlankSearchKeywordException extends RuntimeException{
	public BlankSearchKeywordException() {
		super(ExceptionCode.BLANK_SEARCH_KEYWORD_EXCEPTION.getErrorMessage());
	}

	public BlankSearchKeywordException(String message) {
		super(message);
	}
}

