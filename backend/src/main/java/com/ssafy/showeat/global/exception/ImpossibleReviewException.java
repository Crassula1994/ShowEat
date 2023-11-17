package com.ssafy.showeat.global.exception;

public class ImpossibleReviewException extends RuntimeException{
	public ImpossibleReviewException() {
		super(ExceptionCode.IMPOSSIBLE_REVIEW_EXCEPTION.getErrorMessage());
	}

	public ImpossibleReviewException(String message) {
		super(message);
	}
}
