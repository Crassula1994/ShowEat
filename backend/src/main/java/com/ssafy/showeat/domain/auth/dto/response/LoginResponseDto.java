package com.ssafy.showeat.domain.auth.dto.response;

import com.ssafy.showeat.domain.auth.dto.TokenDto;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LoginResponseDto {
  private TokenDto tokenDto;
  private UserResDto userResDto;
}