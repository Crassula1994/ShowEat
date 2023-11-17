package com.ssafy.showeat.domain.review.dto.request;

import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.review.entity.Review;
import com.ssafy.showeat.domain.user.entity.User;

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
@ApiModel(value = "리뷰 작성 DTO" , description = "고객이 펀딩 리뷰에 필요한 정보")
public class ReviewRequestDto {

	@ApiModelProperty(value = "쿠폰 ID", example = "1")
	private Long couponId;

	@ApiModelProperty(value = "리뷰 내용", example = "마시따마시써")
	private String message;

	public Review toEntity(User user, Funding funding){
		return Review.builder()
			.reviewMessage(message)
			.user(user)
			.funding(funding)
			.build();
	}
}
