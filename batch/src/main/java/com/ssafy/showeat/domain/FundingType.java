package com.ssafy.showeat.domain;

public enum FundingType {
	GIFT_CARD("금액권"),
	MENU("단일 메뉴");

	private final String description;

	FundingType(String description) {
		this.description = description;
	}
}
