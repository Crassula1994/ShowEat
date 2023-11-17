package com.ssafy.showeat.global.exception;

public class InvalidRefreshTokenException extends RuntimeException{
    public InvalidRefreshTokenException() {
        super(ExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION.getErrorMessage());
    }

    public InvalidRefreshTokenException(String message) {
        super(message);
    }
}

