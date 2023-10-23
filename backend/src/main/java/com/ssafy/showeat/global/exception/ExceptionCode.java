package com.ssafy.showeat.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {
	NOT_EXIST_ACCOUNT_EXCEPTION(401, "해당 계정이 존재하지 않습니다."),
	NOT_EXIST_COUPON_EXCEPTION(402, "해당 쿠폰이 존재하지 않습니다."),
	NOT_EXIST_USER_EXCEPTION(450,"사용자를 찾을 수 없습니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");
	private final int errorCode;
	private final String errorMessage;
}
