package com.ssafy.showeat.domain.user.dto.response;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserResponseDto {
    private Long userId;
    private String userNickname;
    private String userImgUrl;
    private String userAddress;
    private boolean userBusiness;
    private int userMoney;
    private boolean visited;
}