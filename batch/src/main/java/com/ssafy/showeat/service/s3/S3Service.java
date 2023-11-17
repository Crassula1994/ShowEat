package com.ssafy.showeat.service.s3;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

	private String bucketName = "showeatbucket";
	private final AmazonS3Client amazonS3Client;

	public String uploadQrImageToS3(MultipartFile image) throws IOException {
		String originalName = image.getOriginalFilename(); // 파일 이름
		long size = image.getSize(); // 파일 크기

		ObjectMetadata objectMetaData = new ObjectMetadata();
		objectMetaData.setContentType(image.getContentType());
		objectMetaData.setContentLength(size);

		// S3에 업로드
		amazonS3Client.putObject(
			new PutObjectRequest(bucketName + "/qr", originalName, image.getInputStream(), objectMetaData)
				.withCannedAcl(CannedAccessControlList.PublicRead)
		);

		return amazonS3Client.getUrl(bucketName + "/qr", originalName).toString();
	}
}
