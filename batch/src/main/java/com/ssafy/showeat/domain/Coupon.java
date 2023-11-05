package com.ssafy.showeat.domain;

import java.time.LocalDate;

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
	@Enumerated(EnumType.STRING)
	private CouponType couponType;

	@Column(nullable = false)
	private LocalDate couponExpirationDate;

	@Column
	private String couponQrCodeImgUrl;

	@Column
	private boolean couponCreatedQr;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "funding_id", nullable = false)
	private Funding funding;

	public static Coupon createCouponByFundingSuccess(User user, Funding funding) {
		return Coupon.builder()
			.couponPrice(funding.getFundingDiscountPrice())
			.couponStatus(CouponStatus.ACTIVE)
			.couponType(CouponType.SINGLE)
			.couponExpirationDate(LocalDate.now().plusDays(1))
			.couponType(CouponType.SINGLE)
			.couponQrCodeImgUrl("")
			.user(user)
			.funding(funding)
			.build();
	}

	public void updateStatus(CouponStatus couponStatus) {
		this.couponStatus = couponStatus;
	}

	public void addCouponQrCodeFileUrl(String s3QrCodeImageUrl) {
		this.couponCreatedQr = true;
		this.couponQrCodeImgUrl = s3QrCodeImageUrl;
	}
}
