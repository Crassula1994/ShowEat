package com.ssafy.showeat.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.MessageType;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import com.ssafy.showeat.domain.NotificationType;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MessageService {

	public static final String SHOWEAT = "[쑈잇] ";
	private final DefaultMessageService messageService;
	private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

	@Value("${sms.sender}")
	private String sender;

	public MessageService() {
		this.messageService = NurigoApp.INSTANCE.initialize(
			"NCSLC4FNKZ8P694C",
			"Z4QQIAQPPITWUUW1DEZK6GJ0CDGRKLUB",
			"https://api.coolsms.co.kr"
		);
	}

	/**
	 * 단일 메시지 발송
	 */
	public SingleMessageSentResponse sendMessage(
		String fundingTitle,
		LocalDate deadLine,
		String userPhone,
		NotificationType notificationType
	) {
		Message message = new Message();
		// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
		message.setFrom(sender);
		message.setTo(userPhone);
		message.setSubject("[쑈잇] " + fundingTitle + notificationType.getSubject());
		String deadLineDate = dateFormat.format(deadLine);
		message.setText(fundingTitle + notificationType.getMessage() + deadLineDate);

		return this.messageService.sendOne(new SingleMessageSendingRequest(message));
	}

	/**
	 * MMS 발송
	 * 단일 발송, 여러 건 발송 상관없이 이용 가능
	 */
	public SingleMessageSentResponse sendMmsQR(
		String fundingTitle,
		LocalDate deadLine,
		String userPhone,
		String qrUrl,
		NotificationType notificationType
	) throws IOException {
		// UUID 생성
		UUID uuid = UUID.randomUUID();

		// UUID를 문자열로 변환
		String uuidString = uuid.toString();
		// 로컬에 저장할 파일 경로
		String localFilePath = uuidString + ".png";

		File imageFile = convertUrlToFile(qrUrl, localFilePath);

		// 이제 'imageFile'은 원격 URL에서 다운로드한 파일을 나타내는 File 객체입니다.
		String imageId = this.messageService.uploadFile(imageFile, StorageType.MMS, null);
		System.gc();

		Message message = new Message();
		// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
		message.setFrom(sender);
		message.setTo(userPhone);
		message.setType(MessageType.MMS);
		message.setSubject(SHOWEAT + fundingTitle + notificationType.getSubject());
		String deadLineDate = dateFormat.format(deadLine);
		message.setText(fundingTitle + notificationType.getMessage() + deadLineDate);
		message.setImageId(imageId);

		// 여러 건 메시지 발송일 경우 send many 예제와 동일하게 구성하여 발송할 수 있습니다.
		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		deleteFile(localFilePath);
		return response;
	}

	public File convertUrlToFile(String imageUrl, String localFilePath) throws IOException {
		URL url = new URL(imageUrl);

		// 이미지 다운로드 및 로컬 파일로 저장
		try (InputStream in = url.openStream()) {
			File imageFile = new File(localFilePath);
			Files.copy(in, imageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
			return imageFile;
		}
	}

	public void deleteFile(String filePath) {
		File fileToDelete = new File(filePath);

		if (fileToDelete.exists()) {
			if (fileToDelete.delete()) {
				log.info("파일 삭제 성공: " + filePath);
			} else {
				log.error("파일 삭제 실패: " + filePath);
			}
		} else {
			log.error("파일이 존재하지 않습니다: " + filePath);
		}
	}

}
