package com.ssafy.showeat.domain.coupon.dto.response;

import java.time.LocalDate;

import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
import com.ssafy.showeat.domain.coupon.entity.CouponType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CouponDetailResponseDto {

	private Long couponId;
	private CouponStatus couponStatus;
	private CouponType couponType;
	private int couponPrice;
	private LocalDate expirationDate;
	private String businessName;
	private String fundingTitle;
	private String fundingMenu;
	private int fundingDiscountPrice;
	private int fundingPrice;

}
