package com.ssafy.showeat.domain.notification.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SseDto {

	@ApiModelProperty(value = "유저ID", example = "1")
	private Long userId;

	@ApiModelProperty(value = "알림ID", example = "1")
	private Long notificationId;
}
