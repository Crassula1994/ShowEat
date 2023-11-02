package com.ssafy.showeat.domain;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
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

	@Column(nullable = false, length = 100)
	private String fundingCategory;

	@Column(nullable = false)
	private int fundingMaxLimit;

	@Column(nullable = false)
	private int fundingMinLimit;

	@Column(nullable = false)
	private int fundingCurCount;

	@Column(nullable = false)
	private int fundingTotalAmount;

	@Column(nullable = false)
	private int fundingDiscountPrice;

	@Column(nullable = false)
	private int fundingDiscountRate;

	@Column(nullable = false, length = 100)
	private String fundingMenu;

	@Column(nullable = false)
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
	private List<UserFunding> userFundings;

	public void changeFundingStatusByFail(){
		this.fundingIsSuccess = FundingIsSuccess.FAIL;
		this.fundingIsActive = FundingIsActive.INACTIVE;
	}

	public void changeFundingStatusBySuccess(){
		this.fundingIsSuccess = FundingIsSuccess.SUCCESS;
		this.fundingIsActive = FundingIsActive.INACTIVE;
	}
}
