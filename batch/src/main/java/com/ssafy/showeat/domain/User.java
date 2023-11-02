package com.ssafy.showeat.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

	@Column(length = 11)
	private String userPhone;

	private boolean userBusiness;

	private int userMoney;

	private boolean visited;
}
