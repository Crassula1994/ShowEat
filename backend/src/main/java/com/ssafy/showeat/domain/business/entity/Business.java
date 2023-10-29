package com.ssafy.showeat.domain.business.entity;

import com.ssafy.showeat.domain.business.dto.response.RegistrationResponseDto;
import com.ssafy.showeat.domain.business.dto.response.SellerResponseDto;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.global.entity.BaseDateEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Business extends BaseDateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long businessId;

    @Column(nullable = false, length = 20)
    private String businessName;

    @Column(nullable = false, length = 1000)
    private String businessImgUrl;

    @Column(nullable = false, length = 20)
    private String businessPhone;

    @Column(nullable = false, length = 10)
    private String businessCeo;

    @Column(nullable = false, length = 100)
    private String businessEmail;

    @Column(nullable = false)
    private int businessMoney;

    @Column(nullable = false)
    private int businessFundingCount;

    @Column(nullable = false)
    private int businessSupporterCount;

    @Column(nullable = false, length = 100)
    private String businessAddress;

    @Column(nullable = false, length = 10)
    private String businessAccountHolder;

    @Column(nullable = false, length = 100)
    private String businessAccount;

    @Column(nullable = false)
    private int businessNumber;

    @Column(nullable = false, length = 1000)
    private String businessRegistrationUrl;

    @Column(nullable = false, length = 1000)
    private String bankBookUrl;

    @Column
    private String businessBio;

    @Column
    private String businessOperatingTime;

    @Column
    private String businessClosedDays;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "business", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Statistic> statistics;

    @OneToMany(mappedBy = "business", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BusinessMenu> businessMenus;

    public void addBusinessMenu(BusinessMenu businessMenu) {
        this.businessMenus.add(businessMenu);
        businessMenu.setBusiness(this);
    }

    public SellerResponseDto toSellerResponseDto() {
        return SellerResponseDto.builder()
                .businessId(businessId)
                .businessImgUrl(businessImgUrl)
                .businessBio(businessBio)
                .businessOperatingTime(businessOperatingTime)
                .businessClosedDays(businessClosedDays)
                .sellerMenuResponseDtos(
                        businessMenus.stream()
                                .map(businessMenu -> businessMenu.toSellerMenuResponseDto())
                                .collect(Collectors.toList())
                )
                .build();
    }

    public RegistrationResponseDto toRegistrationResponseDto() {
        return RegistrationResponseDto.builder()
                .businessId(businessId)
                .businessName(businessName)
                .businessNumber(businessNumber)
                .businessAddress(businessAddress)
                .businessPhone(businessPhone)
                .businessCeo(businessCeo)
                .businessEmail(businessEmail)
                .businessAccountHolder(businessAccountHolder)
                .businessAccount(businessAccount)
                .build();
    }

    public void updateImgUrl(String businessImgUrl) {
        this.businessImgUrl = businessImgUrl;
    }

    public void updateBio(String businessBio) {
        this.businessBio = businessBio;
    }

    public void updateOperatingTime(String operatingTime) {
        this.businessOperatingTime = operatingTime;
    }

    public void updateClosedDays(String businessClosedDays) {
        this.businessClosedDays = businessClosedDays;
    }
}
