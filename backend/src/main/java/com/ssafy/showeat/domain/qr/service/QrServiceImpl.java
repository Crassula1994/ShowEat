package com.ssafy.showeat.domain.qr.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.global.exception.NotExistCouponException;
import com.ssafy.showeat.global.s3.S3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class QrServiceImpl implements QrService {
	private final S3Service s3Service;
	private final CouponRepository couponRepository;

	@Override
	@Transactional
	public void qrToCoupon(Long couponId) throws WriterException, IOException {
		log.info("QrServiceImpl_qrToCoupon || 쿠폰 QR코드 생성 및 이미지 URL 저장");

		// QR 정보
		int width = 200;
		int height = 200;
		String url = "https://showeat.kr/" + couponId;
		Coupon coupon = couponRepository.findById(couponId).orElseThrow(NotExistCouponException::new);

		// QR Code - BitMatrix: qr code 정보 생성
		BitMatrix encode = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);

		// 이미지를 파일로 저장
		String pathname = "qr_code_" + couponId;
		System.out.println(pathname);
		File qrCodeFile = new File(pathname); // 임시로 파일을 생성합니다.

		try {
			MatrixToImageWriter.writeToPath(encode, "PNG", qrCodeFile.toPath());

			MultipartFile qrCodeMultipartFile = convertFileToMultipartFile(qrCodeFile);

			// Amazon S3에 업로드
			String s3ImageUrl = s3Service.uploadImageToS3(qrCodeMultipartFile);
			coupon.addCouponQrCodeFileUrl(s3ImageUrl);

		} catch (Exception e) {
			log.warn("QR Code 파일 생성 및 S3 업로드 중 오류 발생: {}", e.getMessage());
		} finally {
			qrCodeFile.delete();
		}
	}

	public MultipartFile convertFileToMultipartFile(File file) {
		try {
			FileInputStream input = new FileInputStream(file);
			return new MockMultipartFile("file", file.getName(), "image/png", input);
		} catch (Exception e) {
			log.error("파일을 MultipartFile로 변환 중 오류 발생: {}", e.getMessage());
			return null;
		}
	}
}
