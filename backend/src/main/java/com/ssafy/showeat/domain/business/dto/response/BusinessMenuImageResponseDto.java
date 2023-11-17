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
@ApiModel(value = "메뉴 이미지 DTO" , description = "업주가 메뉴 조회시 필요한 이미지 정보")
public class BusinessMenuImageResponseDto {

	@ApiModelProperty(value = "메뉴 이미지 ID", example = "1")
	private Long menuImageId;

	@ApiModelProperty(value = "메뉴 이미지 URL", example = "https://s3.ap-northeast-2~~")
	private String menuImageUrl;

}
