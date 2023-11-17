package com.ssafy.showeat.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SseDto {

	private Long userId;

	private Long notificationId;
}
