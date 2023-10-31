package com.ssafy.showeat.global.exception;

public class NotExistPageFundingException extends RuntimeException{
	public NotExistPageFundingException() {
		super(ExceptionCode.NOT_EXIST_PAGE_FUNDING_EXCEPTION.getErrorMessage());
	}

	public NotExistPageFundingException(String message) {
		super(message);
	}
}
