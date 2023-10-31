package com.ssafy.showeat.domain.payment.dto.request;

import java.util.UUID;

import com.ssafy.showeat.domain.payment.entity.Payment;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {

	@ApiModelProperty(value = "지불 방법", example = "카드")
	private String payType;

	@ApiModelProperty(value = "지불 금액", example = "10000")
	private Long amount;

	@ApiModelProperty(value = "주문 상품 이름", example = "카우카우 금액권")
	private String orderName;

	@ApiModelProperty(value = "구매자 이메일", example = "example@gmail.com")
	private String userEmail;

	@ApiModelProperty(value = "구매자 닉네임", example = "쇼쇼")
	private String userNickname;

	public Payment toEntity() {
		return Payment.builder()
			.payType(payType)
			.amount(amount)
			.orderId(UUID.randomUUID().toString())
			.orderName(orderName)
			.userEmail(userEmail)
			.userNickname(userNickname)
			.build();
	}

}
