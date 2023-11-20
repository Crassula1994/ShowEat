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
import com.ssafy.showeat.domain.funding.entity.FundingType;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.global.entity.BaseTimeEntity;
import com.ssafy.showeat.global.exception.InvalidCouponPriceException;

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
	private boolean writeCouponReview;

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
			.fundingId(funding.getFundingId())
			.couponStatus(couponStatus)
			.couponType(couponType)
			.couponPrice(couponPrice)
			.expirationDate(couponExpirationDate)    // TODO : 60, 90, 180일 더한 날짜 반환
			.remainingDays(ChronoUnit.DAYS.between(currentDate, couponExpirationDate)) // TODO: 만료 날짜 - 현재 날짜 반환
			.businessName(funding.getBusiness().getBusinessName())
			.businessImgUrl(funding.getBusiness().getBusinessImgUrl())
			.fundingMenu(funding.getFundingMenu())
			.fundingTitle(funding.getFundingTitle())
			.fundingPrice(funding.getFundingPrice())
			.fundingDiscountPrice(funding.getFundingDiscountPrice())
			.fundingImgUrl(funding.getFundingImages().get(0).getFundingImgUrl())
			.couponQrCodeImgUrl(couponQrCodeImgUrl)
			.writeCouponReview(writeCouponReview)
			.build();
	}

	public void updateWriteCouponReview() {
		this.writeCouponReview = true;
	}

	public void updateStatus(CouponStatus couponStatus) {
		this.couponStatus = couponStatus;
	}

	public void updatePrice(int amount) {
		int newPrice = this.couponPrice - amount;
		if (newPrice < 0) {
			throw new InvalidCouponPriceException();
		} else {
			this.couponPrice = newPrice;
		}
	}

	public void addCouponQrCodeFileUrl(String s3QrCodeImageUrl) {
		this.couponQrCodeImgUrl = s3QrCodeImageUrl;
	}

	public static Coupon createSingleCouponByFundingSuccess(User user, Funding funding, CouponType couponType) {
		return Coupon.builder()
			.couponPrice(funding.getFundingDiscountPrice())
			.couponStatus(CouponStatus.ACTIVE)
			.couponType(couponType)
			.couponExpirationDate(LocalDate.now().plusDays(180))
			.user(user)
			.funding(funding)
			.build();
	}

	public static Coupon createGiftCardCouponByFundingSuccess(User user, Funding funding, CouponType couponType) {
		return Coupon.builder()
			.couponPrice(funding.getFundingPrice())
			.couponStatus(CouponStatus.ACTIVE)
			.couponType(couponType)
			.couponExpirationDate(LocalDate.now().plusDays(180))
			.user(user)
			.funding(funding)
			.build();
	}
}
