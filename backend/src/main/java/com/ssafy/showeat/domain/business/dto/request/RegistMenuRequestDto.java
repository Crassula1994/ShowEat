package com.ssafy.showeat.domain.business.dto.request;

import java.util.ArrayList;

import com.ssafy.showeat.domain.business.entity.BusinessMenu;

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
@ApiModel(value = "메뉴 등록 DTO" , description = "업주가 메뉴 등록시 필요한 정보")
public class RegistMenuRequestDto {

	@ApiModelProperty(value = "메뉴 이름", example = "야아미")
	private String menu;

	@ApiModelProperty(value = "메뉴 원가", example = "6000")
	private int price;

	public BusinessMenu toEntity(){
		return BusinessMenu.builder()
			.businessMenuName(menu)
			.businessMenuPrice(price)
			.businessMenuImages(new ArrayList<>())
			.build();
	}
}
