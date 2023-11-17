package com.ssafy.showeat.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Funding extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fundingId;

	@Column(nullable = false, length = 100)
	private String fundingTitle;

	@Column(nullable = false)
	private String fundingBusinessName;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 100)
	private FundingType fundingType;

	@Enumerated(EnumType.STRING)
	@Column(length = 100)
	private FundingCategory fundingCategory;

	private int fundingMaxLimit;

	@Column(nullable = false)
	private int fundingMinLimit;

	@Column(nullable = false)
	private int fundingCurCount;

	@Column(nullable = true)
	private int participationRate;

	@Column(nullable = false)
	private int fundingTotalAmount;

	@Column(nullable = false)
	private int fundingDiscountPrice;

	@Column(nullable = false)
	private int fundingDiscountRate;

	@Column(length = 100)
	private String fundingMenu;

	private int fundingPrice;

	@Column(nullable = false)
	private String fundingDescription;

	@Column(nullable = false)
	private LocalDate fundingEndDate;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private FundingIsActive fundingIsActive;

	@Enumerated(EnumType.STRING)
	private FundingIsSuccess fundingIsSuccess;

	@OneToMany(mappedBy = "funding", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<UserFunding> userFundings = new ArrayList<>();

	@OneToMany(mappedBy = "funding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Bookmark> bookmarks = new ArrayList<>();

	public void changeFundingStatusByFail(){
		this.fundingIsSuccess = FundingIsSuccess.FAIL;
		this.fundingIsActive = FundingIsActive.INACTIVE;
	}

	public void changeFundingStatusBySuccess(){
		this.fundingIsSuccess = FundingIsSuccess.SUCCESS;
		this.fundingIsActive = FundingIsActive.INACTIVE;
	}
}
