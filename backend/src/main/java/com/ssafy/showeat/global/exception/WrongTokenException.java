package com.ssafy.showeat.global.exception;

public class WrongTokenException extends RuntimeException{
    public WrongTokenException() {
        super(ExceptionCode.WRONG_TOKEN_EXCEPTION.getErrorMessage());
    }

    public WrongTokenException(String message) {
        super(message);
    }

    public WrongTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public WrongTokenException(Throwable cause) {
        super(cause);
    }

    public WrongTokenException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

