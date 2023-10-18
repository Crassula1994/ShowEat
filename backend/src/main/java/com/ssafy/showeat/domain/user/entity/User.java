package com.ssafy.showeat.domain.user.entity;

import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.ssafy.showeat.domain.credential.entity.Credential;
import com.ssafy.showeat.domain.notification.entity.Notification;
import com.ssafy.showeat.global.entity.BaseTimeEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@Column(nullable = false, length = 20)
	private String userNickname;

	@Column(nullable = false, length = 100)
	private String userImgUrl;

	@Column(nullable = false, length = 20)
	private String userAddress;

	@Column(nullable = false)
	private boolean userBusiness;

	@Column(nullable = false)
	private int userMoney;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "credential_id", nullable = false)
	private Credential credential;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Notification> notifications;

	//닉네임 수정
	public void updateuserNickname(String userNickname) {
		this.userNickname = userNickname;
	}
	//프로필사진 수정
	public void updateuserImgUrl(String userImgUrl) {
		this.userImgUrl = userImgUrl;
	}
	//관심지역 수정
	public void updateAddress(String userAddress) {
		this.userAddress = userAddress;
	}
}
