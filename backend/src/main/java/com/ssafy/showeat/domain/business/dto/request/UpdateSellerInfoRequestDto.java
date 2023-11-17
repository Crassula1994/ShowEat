package com.ssafy.showeat.domain.business.dto.request;

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
public class UpdateSellerInfoRequestDto {

    private String businessBio;

    private String operatingTime;

    private String businessClosedDays;

}
