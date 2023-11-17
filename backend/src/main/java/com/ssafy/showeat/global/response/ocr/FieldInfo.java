package com.ssafy.showeat.global.response.ocr;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
public class FieldInfo {

	@JsonProperty("name")
	private String name;

	@JsonProperty("inferText")
	private String inferText;
}
