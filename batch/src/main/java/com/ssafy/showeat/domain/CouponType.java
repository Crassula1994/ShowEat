package com.ssafy.showeat.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CouponType {

	SINGLE("단일 메뉴권"),
	GIFTCARD("금액권");

	private final String description;
}
