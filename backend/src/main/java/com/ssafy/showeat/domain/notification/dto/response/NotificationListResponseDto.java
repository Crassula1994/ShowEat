package com.ssafy.showeat.domain.notification.dto.response;

import java.util.List;

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
@ApiModel(value = "알림 목록 조회 DTO", description = "알림 목록 조회시 필요한 정보들")
public class NotificationListResponseDto {

	@ApiModelProperty(value = "참여한 펀딩")
	private List<NotificationResponseDto> participatingFunding;

	@ApiModelProperty(value = "좋아요한 펀딩")
	private List<NotificationResponseDto> bookmarkFunding;
}
