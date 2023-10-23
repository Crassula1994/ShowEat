package com.ssafy.showeat.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {
	NOT_EXIST_ACCOUNT_EXCEPTION(401, "해당 계정이 존재하지 않습니다."),
	NOT_EXIST_COUPON_EXCEPTION(402, "해당 쿠폰이 존재하지 않습니다."),
	NOT_EXIST_USER_EXCEPTION(450,"사용자를 찾을 수 없습니다."),
	NOT_EXIST_FUNDING_EXCEPTION(470,"펀딩을 찾을 수 없습니다."),
	INACTIVE_FUNDING_EXCEPTION(471,"이미 종료된 펀딩입니다."),
	IMPOSSIBLE_APPLY_FUNDING_EXCEPTION(472,"펀딩 참여 가능한 자리가 없습니다."),
	DUPLICATION_APPLY_FUNDING_EXCEPTION(473,"펀딩 중복 참여는 불가능합니다."),
	LACK_POINT_USER_FUNDING_EXCEPTION(474,"펀딩에 참여할 유저의 포인트가 부족합니다."),
	IMPOSSIBLE_CANCEL_FUNDING_EXCEPTION(474,"참여하지 않은 펀딩은 취소할 수 없습니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");
	private final int errorCode;
	private final String errorMessage;
}
