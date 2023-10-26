package com.ssafy.showeat.global.exception;

public class UnAuthorizedAccessException extends RuntimeException{
    public UnAuthorizedAccessException() {
        super(ExceptionCode.UNAUTHORIZED_ACCESS_EXCEPTION.getErrorMessage());
    }

    public UnAuthorizedAccessException(String message) {
        super(message);
    }

    public UnAuthorizedAccessException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnAuthorizedAccessException(Throwable cause) {
        super(cause);
    }

    public UnAuthorizedAccessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
