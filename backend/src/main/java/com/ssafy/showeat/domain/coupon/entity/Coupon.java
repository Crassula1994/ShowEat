package com.ssafy.showeat.domain.coupon.entity;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
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
public class Coupon extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long couponId;

	@Column(nullable = false)
	private int couponPrice;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private CouponStatus couponStatus;

	@Column(nullable = false)
	private LocalDate couponExpirationDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "funding_id", nullable = false)
	private Funding funding;

	public CouponResponseDto toCouponResponseDto() {
		LocalDate currentDate = LocalDate.now();

		return CouponResponseDto.builder()
			.couponId(couponId)
			.couponPrice(couponPrice)
			.couponStatus(couponStatus)
			.expirationDate(couponExpirationDate)	// TODO : 60, 90, 180일 더한 날짜 반환
			.businessName(funding.getBusiness().getBusinessName())
			.businessImgUrl(funding.getBusiness().getBusinessImgUrl())
			.fundingTitle(funding.getFundingTitle())
			.fundingMenu(funding.getFundingMenu())
			.fundingDiscountPrice(funding.getFundingDiscountPrice())
			.fundingPrice(funding.getFundingPrice())
			.fundingImageUrl(funding.getFundingImages().get(0).getFundingImgUrl())
			.remainingDays(ChronoUnit.DAYS.between(currentDate, couponExpirationDate)) // TODO: 만료 날짜 - 현재 날짜 반환
			.build();
	}

	public void updateStatus(CouponStatus couponStatus) {
		this.couponStatus = couponStatus;
	}
}
