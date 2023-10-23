package com.ssafy.showeat.domain.coupon.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.request.RequestDocumentation;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.LinkedMultiValueMap;

@SpringBootTest
@AutoConfigureMockMvc
public class CouponControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void getCouponListByUserId() throws Exception {
		mockMvc.perform(get("/api/coupon/{userId}", 1L))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andDo(MockMvcRestDocumentation.document("getCouponListByUserId",
				RequestDocumentation.pathParameters(
					RequestDocumentation.parameterWithName("userId").description("The ID of the user")
				),
				PayloadDocumentation.responseFields(
					PayloadDocumentation.fieldWithPath("[].couponId").description("The ID of the coupon"),
					PayloadDocumentation.fieldWithPath("[].couponPrice").description("The price of the coupon"),
					PayloadDocumentation.fieldWithPath("[].couponState").description("The state of the coupon"),
					PayloadDocumentation.fieldWithPath("[].user").description("The user associated with the coupon"),
					PayloadDocumentation.fieldWithPath("[].funding")
						.description("The funding associated with the coupon")
				)
			));
	}

	@Test
	public void updateCouponState() throws Exception {
		// Create a request body with the couponId and couponState
		LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
		requestParams.add("couponId", "1");
		requestParams.add("couponState", "USED");

		mockMvc.perform(patch("/api/coupon/couponstate")
				.params(requestParams))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andDo(MockMvcRestDocumentation.document("updateCouponState",
				RequestDocumentation.requestParameters(
					RequestDocumentation.parameterWithName("couponId").description("The ID of the coupon"),
					RequestDocumentation.parameterWithName("couponState").description("The new state of the coupon")
				),
				PayloadDocumentation.responseFields(
					PayloadDocumentation.fieldWithPath("message").description("A success message")
				)
			));
	}
}
