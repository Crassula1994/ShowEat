package com.ssafy.showeat.domain.credential.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

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
public class Credential extends BaseTimeEntity {

	@Id
	@Column(nullable = false, length = 128)
	private String credentialId;

	@Column(nullable = false, length = 512)
	private String credentialRefreshToken;

	@Column(nullable = false, length = 128)
	private String credentialEmail;

	@Column(nullable = false, length = 10)
	private String credentialSocialPlatform;

	@Column()
	@Enumerated(EnumType.STRING)
	private CredentialRole credentialRole;
}
