package com.ssafy.showeat.domain.payment.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.payment.dto.response.PaymentResponseDto;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.global.entity.BaseTimeEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Payment extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id", nullable = false, unique = true)
	private Long paymentId;

	@Column(nullable = false)
	private String payType;

	@Column(nullable = false)
	private Long amount;

	@Column(nullable = false)
	private String orderId;

	@Column(nullable = false)
	private String orderName;

	@Column(nullable = false)
	private String userEmail;

	@Column(nullable = false)
	private String userNickname;

	@Setter
	@Column
	private String paymentKey;

	@Column
	private String cancelReason;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public PaymentResponseDto toPaymentResponseDto() {
		return PaymentResponseDto.builder()
			.payType(payType)
			.amount(amount)
			.orderId(orderId)
			.orderName(orderName)
			.userEmail(user.getCredential().getEmail())
			.userNickname(user.getUserNickname())
			.createdAt(this.getCreatedDate().toString())
			.build();
	}

}
