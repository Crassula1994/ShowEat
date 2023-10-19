package com.ssafy.showeat.global.exception;

public class NotExistUserException extends RuntimeException{
    public NotExistUserException() {
        super(ExceptionCode.NOT_EXIST_USER_EXCEPTION.getErrorMessage());
    }

    public NotExistUserException(String message) {
        super(message);
    }
}
