package com.ssafy.showeat.domain.qr.service;

import java.io.IOException;

import com.google.zxing.WriterException;

public interface QrService {
	void qrToCoupon(Long couponId) throws WriterException, IOException;
}
