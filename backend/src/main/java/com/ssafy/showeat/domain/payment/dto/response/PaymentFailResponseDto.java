package com.ssafy.showeat.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentFailResponseDto {
	private String errorCode;
	private String errorMsg;
	private String orderId;
}
