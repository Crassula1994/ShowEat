package com.ssafy.showeat.domain.funding.entity;

public enum FundingSortType {
	POPULARITY("인기순"),
	CLOSING_SOON("마감 임박순"),
	LOW_PRICE("저렴한 가격순"),
	HIGH_DISCOUNT_RATE("높은 할인율 순");

	private final String description;

	FundingSortType(String description) {
		this.description = description;
	}
}
