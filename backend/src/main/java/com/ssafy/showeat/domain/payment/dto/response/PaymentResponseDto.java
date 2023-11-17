package com.ssafy.showeat.domain.payment.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDto {

	@ApiModelProperty(value = "지불 방법", example = "카드")
	private String payType;

	@ApiModelProperty(value = "지불 금액", example = "10000")
	private Long amount;

	@ApiModelProperty(value = "주문 고유ID", example = "10000")
	private String orderId;

	@ApiModelProperty(value = "주문 상품 이름", example = "카우카우 금액권")
	private String orderName;

	@ApiModelProperty(value = "구매자 Credential ID", example = "abcd1234")
	private String credentialId;

	@ApiModelProperty(value = "구매자 이메일", example = "example@gmail.com")
	private String userEmail;

	@ApiModelProperty(value = "구매자 닉네임", example = "쇼쇼")
	private String userNickname;

	@ApiModelProperty(value = "구매자 전화번호", example = "쇼쇼")
	private String userPhone;

	@ApiModelProperty(value = "결제 요청 성공 시 리다이렉트 될 URL")
	private String successUrl;

	@ApiModelProperty(value = "결제 요청 실패 시 리다이렉트 될 URL")
	private String failUrl;

	@ApiModelProperty(value = "결제 요청 시각")
	private String createdAt;

	@ApiModelProperty(value = "결제 취소 사유")
	private String cancelReason;
}
