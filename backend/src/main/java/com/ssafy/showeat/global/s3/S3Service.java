package com.ssafy.showeat.global.s3;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.entity.BusinessMenuImage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

	private String bucketName = "showeatbucket";
	private final AmazonS3Client amazonS3Client;

	public BusinessMenu uploadMenuImageToS3(BusinessMenu businessMenu , List<MultipartFile> menuImages) throws IOException {
		log.info("S3Service_uploadMenuImageToS3 || S3로 메뉴 이미지 업로드");

		for (MultipartFile menuImage : menuImages) {
			String originalName = menuImage.getOriginalFilename(); // 파일 이름
			String uuidName = getUuidFileName(originalName); // UUID 파일이름
			long size = menuImage.getSize(); // 파일 크기

			ObjectMetadata objectMetaData = new ObjectMetadata();
			objectMetaData.setContentType(menuImage.getContentType());
			objectMetaData.setContentLength(size);

			// S3에 업로드
			amazonS3Client.putObject(
				new PutObjectRequest(bucketName+"/menu", uuidName, menuImage.getInputStream(), objectMetaData)
					.withCannedAcl(CannedAccessControlList.PublicRead)
			);

			businessMenu.addBusinessMenuImage(BusinessMenuImage.builder().businessMenuImageUrl(amazonS3Client.getUrl(bucketName+"/menu", uuidName).toString()).build());
		}

		return businessMenu;
	}

	public String uploadBusinessImageToS3(MultipartFile image) throws IOException {
		String originalName = image.getOriginalFilename(); // 파일 이름
		String uuidName = getUuidFileName(originalName); // UUID 파일이름
		long size = image.getSize(); // 파일 크기

		ObjectMetadata objectMetaData = new ObjectMetadata();
		objectMetaData.setContentType(image.getContentType());
		objectMetaData.setContentLength(size);

		// S3에 업로드
		amazonS3Client.putObject(
				new PutObjectRequest(bucketName+"/business", uuidName, image.getInputStream(), objectMetaData)
						.withCannedAcl(CannedAccessControlList.PublicRead)
		);

		return amazonS3Client.getUrl(bucketName+"/business", uuidName).toString();
	}

	public String uploadQrImageToS3(MultipartFile image) throws IOException {
		String originalName = image.getOriginalFilename(); // 파일 이름
		String uuidName = getUuidFileName(originalName); // UUID 파일이름
		long size = image.getSize(); // 파일 크기

		ObjectMetadata objectMetaData = new ObjectMetadata();
		objectMetaData.setContentType(image.getContentType());
		objectMetaData.setContentLength(size);

		// S3에 업로드
		amazonS3Client.putObject(
				new PutObjectRequest(bucketName+"/qr", uuidName, image.getInputStream(), objectMetaData)
						.withCannedAcl(CannedAccessControlList.PublicRead)
		);

		return amazonS3Client.getUrl(bucketName+"/qr", uuidName).toString();
	}

	public String updateFundingImageToS3(MultipartFile image) throws IOException {
		String originalName = image.getOriginalFilename(); // 파일 이름
		String uuidName = getUuidFileName(originalName); // UUID 파일이름
		long size = image.getSize(); // 파일 크기

		ObjectMetadata objectMetaData = new ObjectMetadata();
		objectMetaData.setContentType(image.getContentType());
		objectMetaData.setContentLength(size);

		// S3에 업로드
		amazonS3Client.putObject(
			new PutObjectRequest(bucketName+"/funding", uuidName, image.getInputStream(), objectMetaData)
				.withCannedAcl(CannedAccessControlList.PublicRead)
		);

		return amazonS3Client.getUrl(bucketName+"/funding", uuidName).toString();
	}

	public String getUuidFileName(String fileName) {
		String name = fileName.substring(fileName.indexOf(".") + 1);
		return UUID.randomUUID().toString() + "." + name;
	}
}
