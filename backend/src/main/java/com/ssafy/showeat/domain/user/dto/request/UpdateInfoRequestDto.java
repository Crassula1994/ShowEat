package com.ssafy.showeat.domain.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInfoRequestDto {

    @NotNull
    private Long userId;

    @NotBlank
    private String userNickname;

    @NotBlank
    private String userAddress;

    @NotBlank
    private String userPhone;
}
