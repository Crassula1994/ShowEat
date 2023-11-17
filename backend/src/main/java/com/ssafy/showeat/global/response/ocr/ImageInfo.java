package com.ssafy.showeat.global.response.ocr;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
public class ImageInfo {

	@JsonProperty("fields")
	private List<FieldInfo> fields;
}
