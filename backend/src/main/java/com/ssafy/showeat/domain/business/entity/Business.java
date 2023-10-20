package com.ssafy.showeat.domain.business.entity;

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

import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.global.entity.BaseDateEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Business extends BaseDateEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long businessId;

	@Column(nullable = false, length = 20)
	private String businessName;

	@Column(nullable = false, length = 1000)
	private String businessBio;

	@Column(nullable = false, length = 100)
	private String businessImgUrl;

	@Column(nullable = false, length = 20)
	private String businessPhone;

	@Column(nullable = false, length = 10)
	private String businessCeo;

	@Column(nullable = false, length = 100)
	private String businessEmail;

	@Column(nullable = false)
	private int businessMoney;

	@Column(nullable = false)
	private int businessFundingCount;

	@Column(nullable = false)
	private int businessSupporterCount;

	@Column(nullable = false, length = 100)
	private String businessAddress;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@OneToMany(mappedBy = "business", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Statistic> statistics;

	@OneToMany(mappedBy = "business", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<BusinessMenu> businessMenus;

	public void addBusinessMenu(BusinessMenu businessMenu){
		this.businessMenus.add(businessMenu);
		businessMenu.setBusiness(this);
	}
}
