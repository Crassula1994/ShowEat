package com.ssafy.showeat.domain.funding.entity;

public enum FundingSearchType {
	BUSINESS_NAME("상호명"),
	FUNDING_MENU("펀딩 메뉴"),
	FUNDING_TAG("검색용 태그");

	private final String description;

	FundingSearchType(String description) {
		this.description = description;
	}
}
