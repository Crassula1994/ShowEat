package com.ssafy.showeat.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Getter
@Configuration
public class TossPaymentConfig {

	@Value("${payments.toss.test_client_api_key}")
	private String testClientApiKey;

	@Value("${payments.toss.test_secret_api_key}")
	private String testSecretApiKey;

	public static final String TossOriginUrl = "https://api.tosspayments.com/v1/payments/";

}
