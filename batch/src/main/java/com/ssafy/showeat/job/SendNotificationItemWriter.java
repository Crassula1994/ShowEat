package com.ssafy.showeat.job;

import java.util.List;

import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.ssafy.showeat.domain.Notification;
import com.ssafy.showeat.repository.NotificationRepository;
import com.ssafy.showeat.service.MessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
@Transactional
public class SendNotificationItemWriter implements ItemWriter<Notification> {

	private final MessageService messageService;
	private final NotificationRepository notificationRepository;

	@Override
	public void write(List<? extends Notification> notifications) throws Exception {
		int count = 0;

		for (Notification notification : notifications) {
			log.info("SendNotificationItemWriter write 실행 {}", notification);
			SingleMessageSentResponse singleMessageSentResponse = messageService.sendMessage(
				notification.getFunding().getFundingTitle(),
				notification.getFunding().getFundingEndDate(),
				notification.getUser().getUserPhone(),
				notification.getNotificationType()
			);
			log.info("singleMessageSentResponse = " + singleMessageSentResponse);
			notification.updateSent();
			notificationRepository.save(notification);
			count++;
		}
		log.info("SendNotificationItemWriter - write: 알람 {}/{}건 전송 성공", count, notifications.size());
	}

}
