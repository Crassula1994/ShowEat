package com.ssafy.showeat.global.exception;

public class SseConnectException extends RuntimeException{
	public SseConnectException() {
		super(ExceptionCode.SSE_CONNECT_EXCEPTION.getErrorMessage());
	}

	public SseConnectException(String message) {
		super(message);
	}
}

