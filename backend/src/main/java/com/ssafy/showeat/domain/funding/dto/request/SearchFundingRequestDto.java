package com.ssafy.showeat.domain.funding.dto.request;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "펀딩 검색 DTO" , description = "펀딩 검색에 필요한 정보들")
public class SearchFundingRequestDto {

	@ApiModelProperty(value = "검색 조건")
	private List<String> searchType;

	@ApiModelProperty(value = "펀딩 분류")
	private List<String> category;

	@ApiModelProperty(value = "펀딩 지역")
	private List<String> address;

	@ApiModelProperty(value = "펀딩 최소 금액")
	private int min;

	@ApiModelProperty(value = "펀딩 최소 금액")
	private int max;

	@ApiModelProperty(value = "펀딩 정렬 조건")
	private String sortType;

	@ApiModelProperty(value = "검색어")
	private String keyword;

	@ApiModelProperty(value = "페이지 번호")
	private int page;

	public SearchFundingRequestDto(){
		this.page = 0;
		this.keyword = "";
		this.sortType = "popularity";
		this.min = 0;
		this.max = 1_000_000_000;
		this.searchType = List.of("business","menu","tag");
		this.address = List.of("강남구");
		this.category = List.of("한식");
	}
}
