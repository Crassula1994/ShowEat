package com.ssafy.showeat.domain.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileImageRequestDto {

    @NotNull
    private Long userId;

    @NotBlank
    private String userImgUrl;

    @NotNull
    private List<MultipartFile> files;
}

