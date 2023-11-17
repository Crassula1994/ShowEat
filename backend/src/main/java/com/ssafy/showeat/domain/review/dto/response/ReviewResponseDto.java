package com.ssafy.showeat.domain.review.dto.response;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "리뷰 조회 DTO" , description = "펀딩 리뷰 조회에 필요한 정보")
public class ReviewResponseDto {

	@ApiModelProperty(value = "리뷰 ID")
	private Long reviewId;

	@ApiModelProperty(value = "리뷰 작성 유저ID")
	private Long userId;

	@ApiModelProperty(value = "리뷰 ")
	private String userNickname;

	@ApiModelProperty(value = "리뷰 내용")
	private String message;

	@ApiModelProperty(value = "사용자 이미지 url")
	private String userImgUrl;

	@ApiModelProperty(value = "펀딩ID")
	private Long fundingId;

	@ApiModelProperty(value = "펀딩 제목")
	private String fundingTitle;

	@ApiModelProperty(value = "펀딩 분류")
	private String fundingCategory;

	@ApiModelProperty(value = "펀딩 메뉴")
	private String fundingMenu;

	@ApiModelProperty(value = "최근 수정 날짜")
	private LocalDateTime modifiedDate;
}
