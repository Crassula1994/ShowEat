package com.ssafy.showeat.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentCancelResponseDto {
	private int cancelAmount;
	private String cancelReason;
	private int taxFreeAmount;
	private int taxExemptionAmount;
	private int refundableAmount;
	private int easyPayDiscountAmount;
	private String canceledAt;
	private String transactionKey;
	private String receiptKey;
}
