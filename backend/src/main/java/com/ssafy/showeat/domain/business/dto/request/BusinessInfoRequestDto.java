package com.ssafy.showeat.domain.business.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "비즈니스 정보 DTO", description = "비즈니스 회원 인증시 필요한 정보")
public class BusinessInfoRequestDto {

    @ApiModelProperty(value = "대표자명", example = "문수정")
    private String businessCeo;

    @ApiModelProperty(value = "상호 또는 법인명", example = "쑈잇")
    private String businessName;

    @ApiModelProperty(value = "사업자등록번호", example = "123121234")
    private String businessNumber;

    @ApiModelProperty(value = "개업연월일", example = "20030215")
    private String startDate;

}
