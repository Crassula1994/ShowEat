package com.ssafy.showeat.domain.payment.service;

import static com.ssafy.showeat.global.config.TossPaymentConfig.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import net.minidev.json.JSONObject;

import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentFailResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentSuccessResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentResponseDto;
import com.ssafy.showeat.domain.payment.entity.Payment;
import com.ssafy.showeat.domain.payment.repository.PaymentRepository;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.global.exception.NotExistPaymentException;
import com.ssafy.showeat.global.exception.NotExistUserException;
import com.ssafy.showeat.global.exception.PaymentInvalidOrderAmountException;
import com.ssafy.showeat.global.exception.PaymentInvalidPayTypeException;
import com.ssafy.showeat.global.exception.PaymentInvalidPriceException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;
	private final CredentialRepository credentialRepository;

	@Value("${payments.toss.test_client_api_key}")
	private String testClientApiKey;

	@Value("${payments.toss.test_secret_api_key}")
	private String testSecretApiKey;

	@Value("${payments.toss.success_url}")
	private String successCallBackUrl;

	@Value("${payments.toss.fail_url}")
	private String failCallBackUrl;

	@Override
	@Transactional
	public PaymentResponseDto requestPayment(PaymentRequestDto paymentRequestDto) {
		log.info("PaymentServiceImpl_requestPayment || 결제 요청 정보를 DB에 저장, 필요 정보 반환");
		Long amount = paymentRequestDto.getAmount();
		String payType = paymentRequestDto.getPayType();
		String userEmail = paymentRequestDto.getUserEmail();

		if (amount == null) {
			throw new PaymentInvalidPriceException();
		}

		if (!payType.equals("CARD")) {
			throw new PaymentInvalidPayTypeException();
		}

		Payment payment = paymentRequestDto.toEntity();
		paymentRepository.save(payment);
		credentialRepository.findByEmail(userEmail)
			.ifPresentOrElse(
				C -> C.getUser().addPayment(payment), () -> {
					throw new NotExistUserException();
				}
			);

		PaymentResponseDto paymentResponseDto = payment.toPaymentResponseDto();
		paymentResponseDto.setSuccessUrl(successCallBackUrl);
		paymentResponseDto.setFailUrl(failCallBackUrl);
		return paymentResponseDto;
	}

	@Override
	@Transactional
	public void verifyPayment(String paymentKey, String orderId, Long amount) {
		paymentRepository.findByOrderId(orderId)
			.ifPresentOrElse(
				P -> {
					if (P.getAmount().equals(amount)) {
						P.setPaymentKey(paymentKey);
						P.getUser().updateUserMoney(amount);
					} else {
						throw new PaymentInvalidOrderAmountException();
					}
				}, () -> {
					throw new NotExistPaymentException();
				}
			);
	}

	@Override
	@Transactional
	public PaymentSuccessResponseDto requestPaymentApproval(String paymentKey, String orderId, Long amount) {
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();

		testSecretApiKey = testSecretApiKey + ":";
		String encodedAuth = new String(Base64.getEncoder().encode(testSecretApiKey.getBytes(StandardCharsets.UTF_8)));

		headers.setBasicAuth(encodedAuth);
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		JSONObject param = new JSONObject();
		param.put("paymentKey", paymentKey);
		param.put("orderId", orderId);
		param.put("amount", amount);

		return restTemplate.postForEntity(
			TossOriginUrl + "confirm",
			new HttpEntity<>(param, headers),
			PaymentSuccessResponseDto.class
		).getBody();
	}

	@Override
	@Transactional
	public PaymentFailResponseDto requestPaymentFail(String errorCode, String errorMsg, String orderId) {
		return PaymentFailResponseDto
			.builder()
			.orderId(orderId)
			.errorCode(errorCode)
			.errorMsg(errorMsg)
			.build();
	}

	@Override
	public PaymentSuccessResponseDto requestPaymentCancel(String paymentKey, String cancelReason) {
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		byte[] secretKeyByte = (testSecretApiKey + ":").getBytes(StandardCharsets.UTF_8);
		headers.setBasicAuth(new String(Base64.getEncoder().encode(secretKeyByte)));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		JSONObject param = new JSONObject();
		param.put("cancelReason", cancelReason);

		return restTemplate.postForEntity(
			TossOriginUrl + paymentKey + "/cancel",
			new HttpEntity<>(param, headers),
			PaymentSuccessResponseDto.class
		).getBody();
	}
}
