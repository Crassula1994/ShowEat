package com.ssafy.showeat.domain.notification.dto.response;

import com.ssafy.showeat.domain.notification.entity.NotificationType;

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
@ApiModel(value = "알림 조회 DTO", description = "알림 조회시 필요한 정보들")
public class NotificationResponseDto {

	@ApiModelProperty(value = "알림 아이디")
	private Long notificationId;

	@ApiModelProperty(value = "펀딩 아이디")
	private Long fundingId;

	@ApiModelProperty(value = "알림 제목")
	private String notificationMessage;

	@ApiModelProperty(value = "알림 분류")
	private NotificationType notificationType;

}