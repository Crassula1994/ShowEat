package com.ssafy.showeat.domain.business.dto.request;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.user.entity.User;
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
@ApiModel(value = "비즈니스 회원 등록 DTO", description = "비즈니스 회원 등록시 필요한 정보")
public class BusinessUserRequestDto {

    private final static String DEFAULT_BUSINESS_IMG_URL = "https://img.freepik.com/premium-photo/gold-sculture-of-a-cow_839169-25494.jpg";

    @ApiModelProperty(value = "대표자명", example = "문수정")
    private String businessCeo;

    @ApiModelProperty(value = "대표자 이메일", example = "showeat@gmail.com")
    private String businessEmail;

    @ApiModelProperty(value = "상호 또는 법인명", example = "쑈잇")
    private String businessName;

    @ApiModelProperty(value = "사업자등록번호", example = "123121234")
    private int businessNumber;

    @ApiModelProperty(value = "주소", example = "서울특별시 강남구 역삼동 테헤란로")
    private String businessAddress;

    @ApiModelProperty(value = "연락처", example = "010-1234-1234")
    private String businessPhone;

    @ApiModelProperty(value = "예금주명", example = "문수정")
    private String businessAccountHolder;

    @ApiModelProperty(value = "계좌정보", example = "64091036447807")
    private String businessAccount;


    public Business toEntity(String businessRegistrationUrl,
                             String bankBookUrl,
                             User loginUser) {
        return Business.builder()
                .businessCeo(businessCeo)
                .businessEmail(businessEmail)
                .businessImgUrl(DEFAULT_BUSINESS_IMG_URL)
                .businessName(businessName)
                .businessNumber(String.valueOf(businessNumber))
                .businessPhone(businessPhone)
                .businessAddress(businessAddress)
                .businessRegistrationUrl(businessRegistrationUrl)
                .businessAccountHolder(businessAccountHolder)
                .businessAccount(businessAccount)
                .bankBookUrl(bankBookUrl)
                .businessMoney(0)
                .businessFundingCount(0)
                .businessSupporterCount(0)
                .user(loginUser)
                .build();
    }
}
