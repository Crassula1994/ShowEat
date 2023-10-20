package com.ssafy.showeat.domain.funding.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
@ApiModel(value = "펀딩 메뉴 DTO" , description = "펀딩에 포함 되는 메뉴 정보")
public class MenuRequestDto {

	@ApiModelProperty(value = "메뉴 이름" , example = "1")
	private Long menuId;

	@ApiModelProperty(value = "할인가" , example = "5000")
	private int discountPrice;

}
