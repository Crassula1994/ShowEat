package com.ssafy.showeat.domain.business.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "정산 정보 등록 DTO", description = "정산 정보 등록시 필요한 정보")
public class AccountInfoRequestDto {

	@ApiModelProperty(value = "예금주명", example = "문수정")
	private String accountHolder;

	@ApiModelProperty(value = "은행", example = "싸피뱅크")
	private String accountBank;

	@ApiModelProperty(value = "계좌번호", example = "64091036447807")
	private String accountNumber;

}
