package com.ssafy.showeat.domain.payment.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentFailResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentSuccessResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentResponseDto;
import com.ssafy.showeat.domain.payment.service.PaymentService;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/payments")
public class PaymentController {

	private final PaymentService paymentService;

	@ApiOperation(value = "결제 요청", notes = "결제 요청에 필요한 값들을 반환합니다")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "결제 요청 정보 DB 저장 성공"),
		@ApiResponse(code = 400, message = "결제 요청 정보 DB 저장 실패"),
	})
	@PostMapping("/request/{userId}")
	public ResponseResult requestPayment(
		@ApiParam(value = "요청 객체", required = true) @Valid @RequestBody PaymentRequestDto paymentRequestDto,
		@PathVariable Long userId) {
		PaymentResponseDto paymentResponseDto = paymentService.requestPayment(paymentRequestDto, userId);
		return new SingleResponseResult<>(paymentResponseDto);
	}

	@ApiOperation(value = "결제 승인 요청", notes = "결제 성공 시 결제 승인 요청을 보냅니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "결제 승인 요청 성공"),
		@ApiResponse(code = 400, message = "결제 승인 요청 실패"),
	})
	@GetMapping("/request/success")
	public ResponseResult requestPaymentApproval(
		@ApiParam(value = "결제 타입", required = true) @RequestParam String paymentType,
		@ApiParam(value = "우리 측 주문 고유 번호", required = true) @RequestParam String orderId,
		@ApiParam(value = "토스 측 결제 고유 번호", required = true) @RequestParam String paymentKey,
		@ApiParam(value = "실제 결제 금액", required = true) @RequestParam Long amount) {
		paymentService.verifyPayment(paymentKey, orderId, amount);
		PaymentSuccessResponseDto paymentApprovalResponseDto = paymentService.requestPaymentApproval(paymentKey,
			orderId, amount);
		paymentService.updateUserMoney(orderId, amount);
		return new SingleResponseResult<>(paymentApprovalResponseDto);
	}

	@ApiOperation(value = "결제 에러 반환", notes = "결제 실패 시 에러 코드 및 에러 메시지를 반환합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "결제 승인 요청 성공"),
		@ApiResponse(code = 400, message = "결제 승인 요청 실패"),
	})
	@GetMapping("/request/fail")
	public ResponseResult requestPaymentFail(
		@ApiParam(value = "에러 코드", required = true) @RequestParam(name = "code") String errorCode,
		@ApiParam(value = "에러 메시지", required = true) @RequestParam(name = "message") String errorMsg,
		@ApiParam(value = "우리측 주문 고유 번호", required = true) @RequestParam(name = "orderId") String orderId) {
		PaymentFailResponseDto paymentFailResponseDto = paymentService.requestPaymentFail(errorCode, errorMsg, orderId);
		return new SingleResponseResult<>(paymentFailResponseDto);
	}

	@ApiOperation(value = "결제 취소 요청", notes = "결제 취소를 요청합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "결제 취소 요청 성공"),
		@ApiResponse(code = 400, message = "결제 취소 요청 실패"),
	})
	@PostMapping("/cancel")
	public ResponseResult requestPaymentFail(
		@ApiParam(value = "토스 측 주문 고유 번호", required = true) @RequestParam String paymentKey,
		@ApiParam(value = "결제 취소 사유", required = true) @RequestParam String cancelReason) {
		PaymentSuccessResponseDto paymentSuccessResponseDto = paymentService.requestPaymentCancel(paymentKey,
			cancelReason);
		return new SingleResponseResult<>(paymentSuccessResponseDto);
	}
}
