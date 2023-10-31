package com.ssafy.showeat.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentSuccessResponseDto {
	private String mid;
	private String version;
	private String paymentKey;
	private String orderId;
	private String orderName;
	private String currency;
	private String method;
	private String totalAmount;
	private String balanceAmount;
	private String suppliedAmount;
	private String vat;
	private String status;
	private String requestedAt;
	private String approvedAt;
	private String useEscrow;
	private String cultureExpense;
	private PaymentSuccessCardDto card;
	private PaymentCancelResponseDto cancels;
	private String type;
}
