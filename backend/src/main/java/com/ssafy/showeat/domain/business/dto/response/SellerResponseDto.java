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

	@ApiModelProperty(value = "상호 또는 법인명", example = "야미화니 커피")
	private String businessName;

	@ApiModelProperty(value = "셀러 운영 시간", example = "매일 오전 11시 ~ 익일 새벽 2시")
	private String businessOperatingTime;

	@ApiModelProperty(value = "셀러 휴무일 정보", example = "연중무휴")
	private String businessClosedDays;

	@ApiModelProperty(value = "주소", example = "서울시 강남구 역삼동")
	private String businessAddress;

	@ApiModelProperty(value = "연락처", example = "010-1234-1234")
	private String businessPhone;

	@ApiModelProperty(value = "대표자명", example = "김수환")
	private String businessCeo;

	@ApiModelProperty(value = "이메일", example = "yammy@gmail.com")
	private String businessEmail;

	@ApiModelProperty(value = "사업자등록번호", example = "12341211234")
	private String businessNumber;

	@ApiModelProperty(value = "메뉴 DTO")
	private List<SellerMenuResponseDto> sellerMenuResponseDtos;

}
