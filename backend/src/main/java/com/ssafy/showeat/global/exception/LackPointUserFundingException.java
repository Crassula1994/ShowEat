package com.ssafy.showeat.global.exception;

public class LackPointUserFundingException extends RuntimeException{
	public LackPointUserFundingException() {
		super(ExceptionCode.LACK_POINT_USER_FUNDING_EXCEPTION.getErrorMessage());
	}

	public LackPointUserFundingException(String message) {
		super(message);
	}
}
