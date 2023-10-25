package com.ssafy.showeat.domain.business.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "셀러 정보 조회 DTO" , description = "셀러 정보 조회시 필요한 정보")
public class SellerResponseDto {

	@ApiModelProperty(value = "비즈니스 ID", example = "1")
	private Long businessId;

	@ApiModelProperty(value = "셀러 프로필 사진", example = "셀러 프로필 사진 URL")
	private String businessImgUrl;

	@ApiModelProperty(value = "셀러 소개문", example = "커피 맛집")
	private String businessBio;

	@ApiModelProperty(value = "셀러 운영 시간", example = "매일 오전 11시 ~ 익일 새벽 2시")
	private String businessOperatingTime;

	@ApiModelProperty(value = "셀러 휴무일 정보", example = "연중무휴")
	private String businessClosedDays;

	@ApiModelProperty(value = "메뉴 DTO")
	private List<SellerMenuResponseDto> sellerMenuResponseDtos;

}
