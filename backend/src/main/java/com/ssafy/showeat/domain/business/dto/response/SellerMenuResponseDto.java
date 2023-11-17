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
@ApiModel(value = "셀러 메뉴 조회 DTO" , description = "셀러 메뉴 조회시 필요한 정보")
public class SellerMenuResponseDto {

	@ApiModelProperty(value = "메뉴 ID", example = "1")
	private Long menuId;

	@ApiModelProperty(value = "메뉴 이름", example = "야아미")
	private String menu;

}
