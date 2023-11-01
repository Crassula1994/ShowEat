package com.ssafy.showeat.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {
	INVALID_SEARCH_TYPE_EXCEPTION(410,"유효하지 않은 검색 조건입니다."),
	INVALID_SORT_TYPE_EXCEPTION(411,"유효하지 않은 정렬 조건입니다."),
	INVALID_CATEGORY_TYPE_EXCEPTION(412,"유효하지 않은 카테고리 조건입니다."),
	BLANK_SEARCH_KEYWORD_EXCEPTION(413,"검색어를 입력해 주세요."),
	PAYMENT_INVALID_PRICE_EXCEPTION(420, "유효하지 않은 가격입니다."),
	PAYMENT_INVALID_PAY_TYPE_EXCEPTION(421, "유효하지 않은 결제수단입니다."),
	PAYMENT_INVALID_ORDER_AMOUNT_EXCEPTION(422, "결제 요청과 승인 금액이 다릅니다."),
	INVALID_REFRESH_TOKEN_EXCEPTION(430,"유효하지 않은 토큰입니다."),
	EXPIRED_TOKEN_EXCEPTION(431,"만료된 토큰입니다."),
	UNAUTHORIZED_ACCESS_EXCEPTION(432,"접근 권한이 없습니다."),
	WRONG_TOKEN_EXCEPTION(433,"잘못된 토큰입니다."),
	IMPOSSIBLE_REVIEW_EXCEPTION(440, "사용된 쿠폰에 한해서 리뷰가 작성 가능합니다."),
	NOT_EXIST_USER_EXCEPTION(450,"사용자가 존재하지 않습니다."),
	NOT_EXIST_BUSINESS_EXCEPTION(451, "해당 업체가 존재하지 않습니다."),
	NOT_EXIST_FUNDING_EXCEPTION(452,"해당 펀딩이 존재하지 않습니다."),
	NOT_EXIST_PAYMENT_EXCEPTION(453, "해당 결제 내역이 존재하지 않습니다."),
	NOT_EXIST_COUPON_EXCEPTION(460, "해당 쿠폰이 존재하지 않습니다."),
	INVALID_COUPON_TYPE_EXCEPTION(461,"유효하지 않은 쿠폰 타입입니다."),
	INVALID_COUPON_PRICE_EXCEPTION(462,"차감 가격이 유효하지 않습니다."),
	INACTIVE_FUNDING_EXCEPTION(481,"이미 종료된 펀딩입니다."),
	IMPOSSIBLE_APPLY_FUNDING_EXCEPTION(482,"펀딩 참여 가능한 자리가 없습니다."),
	DUPLICATION_APPLY_FUNDING_EXCEPTION(483,"펀딩 중복 참여는 불가능합니다."),
	LACK_POINT_USER_FUNDING_EXCEPTION(484,"펀딩에 참여할 유저의 포인트가 부족합니다."),
	IMPOSSIBLE_CANCEL_FUNDING_EXCEPTION(485,"참여하지 않은 펀딩은 취소할 수 없습니다."),
	NOT_EXIST_PAGE_FUNDING_EXCEPTION(486,"해당 페이지는 데이터가 없기에 조회할 수 없습니다."),
	IMPOSSIBLE_DELETE_MENU_EXCEPTION(490,"메뉴를 삭제할 수 없습니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");

	private final int errorCode;
	private final String errorMessage;
}
