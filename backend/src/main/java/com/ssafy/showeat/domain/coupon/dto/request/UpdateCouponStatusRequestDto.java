package com.ssafy.showeat.domain.coupon.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.ssafy.showeat.domain.coupon.entity.CouponStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCouponStatusRequestDto {

	@NotNull
	private Long couponId;

	@NotBlank
	private CouponStatus couponStatus;

}
