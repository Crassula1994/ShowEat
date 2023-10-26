package com.ssafy.showeat.global.exception;

public class ExpiredTokenException extends RuntimeException{
    public ExpiredTokenException() {
        super(ExceptionCode.EXPIRED_TOKEN_EXCEPTION.getErrorMessage());
    }

    public ExpiredTokenException(String message) {
        super(message);
    }

    public ExpiredTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExpiredTokenException(Throwable cause) {
        super(cause);
    }

    public ExpiredTokenException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace){
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
