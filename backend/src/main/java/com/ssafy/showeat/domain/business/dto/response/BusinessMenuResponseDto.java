package com.ssafy.showeat.domain.business.dto.response;

import java.util.List;

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
@ApiModel(value = "메뉴 조회 DTO" , description = "업주가 메뉴 조회시 필요한 정보")
public class BusinessMenuResponseDto {

	@ApiModelProperty(value = "메뉴 아이디", example = "1")
	private Long menuId;

	@ApiModelProperty(value = "메뉴 이름", example = "야아미")
	private String menu;

	@ApiModelProperty(value = "메뉴 원가", example = "6000")
	private int price;

	@ApiModelProperty(value = "메뉴 이미지 DTO")
	private List<BusinessMenuImageResponseDto> businessMenuImageResponseDtos;

}
