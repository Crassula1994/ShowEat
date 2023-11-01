package com.ssafy.showeat.global.response.ocr;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClovaOcrResponseDto {

	@JsonProperty("images")
	private List<ImageInfo> images;
}

