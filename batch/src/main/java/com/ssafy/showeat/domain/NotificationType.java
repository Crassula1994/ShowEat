package com.ssafy.showeat.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {

	COUPON_CREATE(" 쿠폰 도착", " 쿠폰이 도착했습니다! \n 사용기한: "),
	COUPON_DEADLINE(" 쿠폰 마감 하루 전", " 쿠폰이 곧 소멸됩니다! \n 서둘러 사용하세요! \n 마감날짜: "),
	FUNDING_DEADLINE(" 펀딩 마감 하루 전", " 펀딩이 곧 종료됩니다! \n 서둘러 참여하세요! \n 마감날짜: "),
	FUNDING_FAIL(" 펀딩 실패", " 펀딩에 실패했습니다ㅠㅠ \n 다음 펀딩에 참여해보세요! ");

	private final String subject;
	private final String message;
}
