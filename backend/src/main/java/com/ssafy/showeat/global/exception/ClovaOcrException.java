package com.ssafy.showeat.global.exception;

public class ClovaOcrException extends RuntimeException {

	public ClovaOcrException() {
		super(ExceptionCode.CLOVA_OCR_EXCEPTION.getErrorMessage());
	}

	public ClovaOcrException(String message) {
		super(message);
	}
}

