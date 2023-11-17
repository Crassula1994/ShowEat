package com.ssafy.showeat.domain.business.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "사업자 등록 정보 조회 DTO" , description = "사업자 등록 정보 조회시 필요한 정보")
public class RegistrationResponseDto {

	@ApiModelProperty(value = "비즈니스 ID", example = "1")
	private Long businessId;

	@ApiModelProperty(value = "상호 또는 법인명", example = "야미화니 커피")
	private String businessName;

	@ApiModelProperty(value = "사업자등록번호", example = "12341211234")
	private String businessNumber;

	@ApiModelProperty(value = "주소", example = "서울시 강남구 역삼동")
	private String businessAddress;

	@ApiModelProperty(value = "연락처", example = "010-1234-1234")
	private String businessPhone;

	@ApiModelProperty(value = "대표자명", example = "김수환")
	private String businessCeo;

	@ApiModelProperty(value = "이메일", example = "yammy@gmail.com")
	private String businessEmail;

	@ApiModelProperty(value = "예금주", example = "김수환")
	private String businessAccountHolder;

	@ApiModelProperty(value = "계좌정보", example = "싸피은행 123444564-56-1234")
	private String businessAccount;

}
