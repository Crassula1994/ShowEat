package com.ssafy.showeat.domain.coupon.dto.response;

import java.time.LocalDate;

import com.ssafy.showeat.domain.coupon.entity.CouponStatus;

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
public class CouponResponseDto {

	private Long couponId;
	private CouponStatus couponStatus;
	private int couponPrice;
	private LocalDate expirationDate;
	private String businessName;
	private String businessImgUrl;
	private String fundingTitle;
	private String fundingMenu;
	private int fundingDiscountPrice;
	private int fundingPrice;
	private String fundingImageUrl;
	private Long remainingDays;

}
