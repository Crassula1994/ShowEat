package com.ssafy.showeat.domain.funding.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.funding.dto.response.FundingTagResponseDto;
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
public class FundingTag extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fundingTagId;

	@Column(nullable = false, length = 30)
	private String fundingTag;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "funding_id", nullable = false)
	private Funding funding;

	public void setFunding(Funding funding){
		this.funding = funding;
	}

	public FundingTagResponseDto toFundingTagResponseDto(){
		return FundingTagResponseDto
			.builder()
			.tagId(fundingTagId)
			.fundingTag(fundingTag)
			.build();
	}
}
