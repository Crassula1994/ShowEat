package com.ssafy.showeat.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {
	INVALID_REFRESH_TOKEN_EXCEPTION(430,"유효하지 않은 토큰입니다."),
	EXPIRED_TOKEN_EXCEPTION(431,"만료된 토큰입니다."),
	UNAUTHORIZED_ACCESS_EXCEPTION(432,"접근 권한이 없습니다."),
	WRONG_TOKEN_EXCEPTION(433,"잘못된 토큰입니다."),
	IMPOSSIBLE_REVIEW_EXCEPTION(440, "사용된 쿠폰에 한해서 리뷰가 작성 가능합니다."),
	NOT_EXIST_USER_EXCEPTION(450,"사용자를 찾을 수 없습니다."),
	NOT_EXIST_BUSINESS_EXCEPTION(460, "해당 업체가 존재하지 않습니다."),
	NOT_EXIST_COUPON_EXCEPTION(470, "해당 쿠폰이 존재하지 않습니다."),
	NOT_EXIST_FUNDING_EXCEPTION(480,"펀딩을 찾을 수 없습니다."),
	INACTIVE_FUNDING_EXCEPTION(481,"이미 종료된 펀딩입니다."),
	IMPOSSIBLE_APPLY_FUNDING_EXCEPTION(482,"펀딩 참여 가능한 자리가 없습니다."),
	DUPLICATION_APPLY_FUNDING_EXCEPTION(483,"펀딩 중복 참여는 불가능합니다."),
	LACK_POINT_USER_FUNDING_EXCEPTION(484,"펀딩에 참여할 유저의 포인트가 부족합니다."),
	IMPOSSIBLE_CANCEL_FUNDING_EXCEPTION(485,"참여하지 않은 펀딩은 취소할 수 없습니다."),
	IMPOSSIBLE_DELETE_MENU_EXCEPTION(490,"메뉴를 삭제할 수 없습니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");

	private final int errorCode;
	private final String errorMessage;
}
