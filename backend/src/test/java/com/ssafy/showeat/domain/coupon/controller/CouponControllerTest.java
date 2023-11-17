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
	public void getActiveCouponListByUserId() throws Exception {
		mockMvc.perform(get("/api/coupon/active/{userId}", 1L))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andDo(MockMvcRestDocumentation.document("getActiveCouponListByUserId",
				RequestDocumentation.pathParameters(
					RequestDocumentation.parameterWithName("userId").description("The ID of the user")
				),
				PayloadDocumentation.responseFields(
					PayloadDocumentation.fieldWithPath("[].couponId").description("The ID of the coupon"),
					PayloadDocumentation.fieldWithPath("[].CouponStatus").description("The status of the coupon"),
					PayloadDocumentation.fieldWithPath("[].couponPrice").description("The remaining price of the coupon"),
					PayloadDocumentation.fieldWithPath("[].expirationDate").description("The expiration date of the coupon"),
					PayloadDocumentation.fieldWithPath("[].businessName").description("The business name of the coupon"),
					PayloadDocumentation.fieldWithPath("[].businessImgUrl").description("The business image url of the coupon"),
					PayloadDocumentation.fieldWithPath("[].fundingTitle").description("The funding title of the coupon"),
					PayloadDocumentation.fieldWithPath("[].fundingMenu").description("The funding menu of the coupon"),
					PayloadDocumentation.fieldWithPath("[].fundingDiscountPrice").description("The discount price of the coupon"),
					PayloadDocumentation.fieldWithPath("[].fundingPrice").description("The original price of the coupon"),
					PayloadDocumentation.fieldWithPath("[].fundingImgUrl").description("The funding image url of the coupon"),
					PayloadDocumentation.fieldWithPath("[].remainingDays").description("The remaining days of the coupon")
				)
			));
	}

	@Test
	public void updateCouponStatus() throws Exception {
		// Create a request body with the couponId and CouponStatus
		LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
		requestParams.add("couponId", "1");
		requestParams.add("CouponStatus", "USED");

		mockMvc.perform(patch("/api/coupon/CouponStatus")
				.params(requestParams))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andDo(MockMvcRestDocumentation.document("updateCouponStatus",
				RequestDocumentation.requestParameters(
					RequestDocumentation.parameterWithName("couponId").description("The ID of the coupon"),
					RequestDocumentation.parameterWithName("CouponStatus").description("The new state of the coupon")
				),
				PayloadDocumentation.responseFields(
					PayloadDocumentation.fieldWithPath("message").description("A success message")
				)
			));
	}
}
