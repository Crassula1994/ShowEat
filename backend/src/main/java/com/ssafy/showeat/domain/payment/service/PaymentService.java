package com.ssafy.showeat.domain.payment.service;

import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentFailResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentSuccessResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentResponseDto;

public interface PaymentService {
	PaymentResponseDto requestPayment(PaymentRequestDto requestPaymentDto);

	void verifyPayment(String paymentKey, String orderId, Long amount);

	PaymentSuccessResponseDto requestPaymentApproval(String paymentKey, String orderId, Long amount);

	PaymentFailResponseDto requestPaymentFail(String errorCode, String errorMsg, String orderId);

	PaymentSuccessResponseDto requestPaymentCancel(String paymentKey, String cancelReason);
}
