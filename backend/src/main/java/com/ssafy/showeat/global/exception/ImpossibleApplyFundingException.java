package com.ssafy.showeat.global.exception;

public class ImpossibleApplyFundingException extends RuntimeException{
	public ImpossibleApplyFundingException() {
		super(ExceptionCode.IMPOSSIBLE_APPLY_FUNDING_EXCEPTION.getErrorMessage());
	}

	public ImpossibleApplyFundingException(String message) {
		super(message);
	}
}

