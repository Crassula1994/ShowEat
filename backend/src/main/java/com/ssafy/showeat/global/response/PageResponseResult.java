package com.ssafy.showeat.global.response;

import org.springframework.data.domain.Page;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PageResponseResult<T> extends ResponseResult {

	private Page<T> data;

	public PageResponseResult(Page<T> data) {
		super(successResponse.statusCode, successResponse.messages, successResponse.developerMessage,
			successResponse.timestamp);
		this.data = data;
	}
}
