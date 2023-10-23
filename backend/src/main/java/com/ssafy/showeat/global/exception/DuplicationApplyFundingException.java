package com.ssafy.showeat.global.exception;

public class DuplicationApplyFundingException extends RuntimeException{
	public DuplicationApplyFundingException() {
		super(ExceptionCode.DUPLICATION_APPLY_FUNDING_EXCEPTION.getErrorMessage());
	}

	public DuplicationApplyFundingException(String message) {
		super(message);
	}
}
