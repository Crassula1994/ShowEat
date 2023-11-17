package com.ssafy.showeat.job;

import java.util.List;

import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.Coupon;
import com.ssafy.showeat.domain.CouponStatus;
import com.ssafy.showeat.domain.Notification;
import com.ssafy.showeat.kafka.KafkaProducer;
import com.ssafy.showeat.kafka.SseDto;
import com.ssafy.showeat.repository.CouponRepository;
import com.ssafy.showeat.repository.NotificationRepository;
import com.ssafy.showeat.service.MessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
@Transactional
public class SendMmsNotificationItemWriter implements ItemWriter<Notification> {

	private final KafkaProducer kafkaProducer;
	private final MessageService messageService;
	private final NotificationRepository notificationRepository;
	private final CouponRepository couponRepository;

	@Override
	public void write(List<? extends Notification> notifications) throws Exception {
		int count = 0;

		for (Notification notification : notifications) {
			log.info("SendMmsNotificationItemWriter write 실행 {}", notification);

			//메시지 보내기
			messageService.sendMmsQR(notification);
			notification.updateSent();
			notificationRepository.save(notification);

			//쿠폰 상태 업데이트
			Coupon coupon = notification.getCoupon();
			coupon.updateStatus(CouponStatus.ACTIVE);
			couponRepository.save(coupon);

			//sse 알림
			kafkaProducer.send(new SseDto(notification.getUser().getUserId(), notification.getNotificationId()));
			count++;
		}
		log.info("SendMmsNotificationItemWriter - write: 알람 {}/{}건 전송 성공", count, notifications.size());
	}

}
