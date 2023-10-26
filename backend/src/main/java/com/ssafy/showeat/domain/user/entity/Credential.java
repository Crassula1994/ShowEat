package com.ssafy.showeat.domain.user.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import com.ssafy.showeat.global.entity.BaseTimeEntity;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Credential extends BaseTimeEntity {

	@Id
	@Column(length = 128)
	private String credentialId;

	@Column(length = 128)
	private String email;

	@Column(length = 10)
	private String credentialSocialPlatform;

	@NotNull
	@Enumerated(EnumType.STRING)
	private CredentialRole credentialRole;

	public String getRoleKey() {
		return this.credentialRole.getCode();
	}


}
