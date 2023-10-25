package com.ssafy.showeat.domain.business.entity;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ssafy.showeat.domain.business.dto.response.BusinessMenuResponseDto;

import com.ssafy.showeat.domain.business.dto.response.SellerMenuResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BusinessMenu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long businessMenuId;

	@Column(nullable = false)
	private int businessMenuPrice;

	@Column(nullable = false, length = 100)
	private String businessMenuName;

	@OneToMany(mappedBy = "businessMenu", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<BusinessMenuImage> businessMenuImages;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "business_id", nullable = false)
	private Business business;

	public void setBusiness(Business business){
		this.business = business;
	}

	public void addBusinessMenuImage(BusinessMenuImage businessMenuImage){
		this.businessMenuImages.add(businessMenuImage);
		businessMenuImage.setBusinessMenu(this);
	}

	public BusinessMenuResponseDto toBusinessMenuResponseDto(){
		return BusinessMenuResponseDto.builder()
			.menu(businessMenuName)
			.price(businessMenuPrice)
			.businessMenuImageResponseDtos(
				businessMenuImages.stream()
					.map(businessMenuImage -> businessMenuImage.toBusinessMenuImageResponseDto())
					.collect(Collectors.toList())
			)
			.build();
	}

	public SellerMenuResponseDto toSellerMenuResponseDto() {
		return SellerMenuResponseDto.builder()
				.menuId(businessMenuId)
				.menu(businessMenuName)
				.build();
	}
}
