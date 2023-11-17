package com.ssafy.showeat.domain.qr.service;

import java.io.IOException;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.google.zxing.WriterException;
import com.ssafy.showeat.domain.coupon.entity.Coupon;

public interface QrService {
	@Transactional
	Coupon qrToCoupon(Coupon coupon) throws WriterException, IOException;

	List<Coupon> createQr(List<Coupon> coupons) throws IOException, WriterException;
}
