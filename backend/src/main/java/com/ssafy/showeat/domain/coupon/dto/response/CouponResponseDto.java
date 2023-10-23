package com.ssafy.showeat.domain.coupon.dto.response;

import com.ssafy.showeat.domain.coupon.entity.CouponState;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

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
	private int couponPrice;
	private CouponState couponState;
	private User user;
	private Funding funding;

}
