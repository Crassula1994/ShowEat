package com.ssafy.showeat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notification extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long notificationId;

	@Column(nullable = false)
	private boolean notificationIsChecked;

	@Column(nullable = false)
	private String notificationMessage;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private NotificationType notificationType;

	@Column(nullable = false)
	private boolean notificationSent;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "funding_id", nullable = false)
	private Funding funding;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "coupon_id")
	private Coupon coupon;

	//user, 문자메시지, NotificationType.FUNDING_FAIL
	public static Notification create(User user, Funding funding, String message, NotificationType notificationType) {
		return Notification.builder()
			.notificationIsChecked(false)
			.notificationType(notificationType)
			.notificationMessage(message)
			.funding(funding)
			.user(user)
			.build();
	}

	public static Notification createMms(
		User user,
		Funding funding,
		String message,
		NotificationType notificationType,
		Coupon coupon
	) {
		return Notification.builder()
			.notificationIsChecked(false)
			.notificationType(notificationType)
			.notificationMessage(message)
			.coupon(coupon)
			.funding(funding)
			.user(user)
			.build();
	}

	public void updateSent() {
		this.notificationSent = true;
	}
}
