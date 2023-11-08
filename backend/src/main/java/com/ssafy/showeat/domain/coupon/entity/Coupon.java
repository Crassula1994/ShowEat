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

import com.ssafy.showeat.domain.coupon.dto.response.CouponDetailResponseDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponListResponseDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "funding_id", nullable = false)
	private Funding funding;

	public CouponDetailResponseDto toCouponDetailResponseDto() {
		return CouponDetailResponseDto.builder()
			.couponId(couponId)
			.couponStatus(couponStatus)
			.couponType(couponType)
			.couponPrice(couponPrice)
			.expirationDate(couponExpirationDate)    // TODO : 60, 90, 180일 더한 날짜 반환
			.businessName(funding.getBusiness().getBusinessName())
			.fundingTitle(funding.getFundingTitle())
			.fundingMenu(funding.getFundingMenu())
			.fundingDiscountPrice(funding.getFundingDiscountPrice())
			.fundingPrice(funding.getFundingPrice())
			.couponQrCodeImgUrl(couponQrCodeImgUrl)
			.build();
	}

	public CouponListResponseDto toCouponListResponseDto() {
		LocalDate currentDate = LocalDate.now();

		return CouponListResponseDto.builder()
			.couponId(couponId)
			.couponStatus(couponStatus)
			.couponType(couponType)
			.couponOriginalPrice(funding.getFundingDiscountPrice())
			.expirationDate(couponExpirationDate)    // TODO : 60, 90, 180일 더한 날짜 반환
			.businessName(funding.getBusiness().getBusinessName())
			.businessImgUrl(funding.getBusiness().getBusinessImgUrl())
			.fundingMenu(funding.getFundingMenu())
			.fundingImgUrl(funding.getFundingImages().get(0).getFundingImgUrl())
			.remainingDays(ChronoUnit.DAYS.between(currentDate, couponExpirationDate)) // TODO: 만료 날짜 - 현재 날짜 반환
			.build();
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

	public static Coupon createCouponByFundingSuccess(User user , Funding funding){
		return Coupon.builder()
			.couponPrice(funding.getFundingDiscountPrice())
			.couponStatus(CouponStatus.ACTIVE)
			.couponType(CouponType.SINGLE)
			.couponExpirationDate(LocalDate.now().plusDays(1))
			.user(user)
			.funding(funding)
			.build();
	}
}
