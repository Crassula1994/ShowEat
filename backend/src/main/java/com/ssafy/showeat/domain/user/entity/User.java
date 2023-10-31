package com.ssafy.showeat.domain.user.entity;

import java.util.List;

import javax.persistence.*;

import com.ssafy.showeat.domain.notification.entity.Notification;
import com.ssafy.showeat.domain.payment.entity.Payment;
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

	@Column(length = 20)
	private String userAddress;

	private boolean userBusiness;

	private int userMoney;

	private boolean visited;

	@OneToOne
	@JoinColumn(name = "credential_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private Credential credential;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Notification> notifications;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Payment> payments;

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
	//방문여부
	public void setVisited(boolean visited) {
		this.visited = visited;
	}
	
	public boolean haveMoney(int fundingPrice){
		if(this.userMoney < fundingPrice) return false;
		return true;
	}

	public void spendMoney(int fundingPrice) {
		this.userMoney -= fundingPrice;
	}

	public void refundMoney(int fundingPrice) {
		this.userMoney += fundingPrice;
	}

	public void addPayment(Payment payment) {
		payments.add(payment);
	}
}
