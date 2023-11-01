package com.ssafy.showeat.domain.review.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.review.dto.response.ReviewResponseDto;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.global.entity.BaseTimeEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewId;

	@Column(nullable = false, length = 1000)
	private String reviewMessage;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "funding_id", nullable = false)
	private Funding funding;

	public ReviewResponseDto toReviewResponseDto(){
		return ReviewResponseDto.builder()
			.reviewId(reviewId)
			.userId(user.getUserId())
			.userImgUrl(user.getUserImgUrl())
			.userNickname(user.getUserNickname())
			.fundingId(funding.getFundingId())
			.fundingTitle(funding.getFundingTitle())
			.fundingCategory(funding.getFundingCategory().name())
			.fundingMenu(funding.getFundingMenu())
			.modifiedDate(this.getModifiedDate())
			.build();
	}
}
