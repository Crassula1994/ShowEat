package com.ssafy.showeat.domain.qr.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.WriterException;
import com.ssafy.showeat.domain.qr.service.QrService;
import com.ssafy.showeat.global.response.ResponseResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/qr")
@RestController
public class QrController {

	private final QrService qrService;
	//
	// @GetMapping("/{couponId}")
	// public ResponseResult qrToCoupon(@PathVariable Long couponId) throws WriterException, IOException {
	// 	qrService.qrToCoupon(couponId);
	// 	return ResponseResult.successResponse;
	// }
}
