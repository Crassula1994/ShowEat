package com.ssafy.showeat.global.exception;

public class ImpossibleCancelFundingException extends RuntimeException{
	public ImpossibleCancelFundingException() {
		super(ExceptionCode.IMPOSSIBLE_CANCEL_FUNDING_EXCEPTION.getErrorMessage());
	}

	public ImpossibleCancelFundingException(String message) {
		super(message);
	}
}
