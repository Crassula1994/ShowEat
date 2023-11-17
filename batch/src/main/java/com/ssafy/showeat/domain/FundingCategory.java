package com.ssafy.showeat.domain;

public enum FundingCategory {
	KOREAN("한식"),
	CHINESE("중식"),
	JAPANESE_SUSHI("일식/회"),
	WESTERN("양식"),
	CHICKEN_BURGER("치킨/버거"),
	ASIAN("아시안"),
	SNACKS_LATE_NIGHT("분식/야식"),
	CAFE_DESSERT("카페/디저트");

	private final String description;

	FundingCategory(String description) {
		this.description = description;
	}
}
