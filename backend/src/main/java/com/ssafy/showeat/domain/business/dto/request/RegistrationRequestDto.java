package com.ssafy.showeat.domain.business.dto.request;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.user.entity.User;

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
public class RegistrationRequestDto {

    private final static String DEFAULT_BUSINESS_IMG_URL = "https://s3.ap-northeast-2.amazonaws.com/showeatbucket/business/bc756e90-fe78-4f27-9a99-ad00df3a24c0.jpg";

    @ApiModelProperty(value = "대표자명", example = "문수정")
    private String ceo;

    @ApiModelProperty(value = "대표자 이메일", example = "showeat@gmail.com")
    private String email;

    @ApiModelProperty(value = "상호 또는 법인명", example = "쑈잇")
    private String businessName;

    @ApiModelProperty(value = "사업자등록번호", example = "123121234")
    private String businessNumber;

    @ApiModelProperty(value = "개업연월일", example = "20030215")
    private String startDate;

    @ApiModelProperty(value = "주소", example = "서울특별시 강남구 역삼동 테헤란로")
    private String newBusinessAddress;

    @ApiModelProperty(value = "연락처", example = "010-1234-1234")
    private String businessPhone;

    public Business toEntity(String businessRegistrationUrl, User loginUser) {
        return Business.builder()
            .businessCeo(ceo)
            .businessEmail(email)
            .businessImgUrl(DEFAULT_BUSINESS_IMG_URL)
            .businessName(businessName)
            .businessNumber(businessNumber)
            .businessPhone(businessPhone)
            .businessAddress(newBusinessAddress)
            .businessRegistrationUrl(businessRegistrationUrl)
            .businessMoney(0)
            .businessFundingCount(0)
            .businessSupporterCount(0)
            .user(loginUser)
            .build();
    }
}
