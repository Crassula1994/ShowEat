package com.ssafy.showeat.domain.auth.dto.response;

import com.ssafy.showeat.domain.auth.dto.TokenDto;
import com.ssafy.showeat.domain.user.entity.CredentialRole;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserResDto {
    private Long userId;
    private String userNickname;
    private String userImgUrl;
    private String userAddress;
    private boolean userBusiness;
    private boolean visited;
    private int userMoney;
    private CredentialRole credentialRole;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private TokenDto tokenDto;
}
