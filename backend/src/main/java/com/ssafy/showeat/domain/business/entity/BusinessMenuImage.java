package com.ssafy.showeat.domain.business.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.business.dto.response.BusinessMenuImageResponseDto;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BusinessMenuImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long businessMenuImageId;

	@Column(nullable = false)
	private String businessMenuImageUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "business_menu_id", nullable = false)
	private BusinessMenu businessMenu;

	public void setBusinessMenu(BusinessMenu businessMenu){
		this.businessMenu = businessMenu;
	}

	public BusinessMenuImageResponseDto toBusinessMenuImageResponseDto(){
		return BusinessMenuImageResponseDto.builder()
			.menuImageId(businessMenuImageId)
			.menuImageUrl(businessMenuImageUrl)
			.build();
	}
}
