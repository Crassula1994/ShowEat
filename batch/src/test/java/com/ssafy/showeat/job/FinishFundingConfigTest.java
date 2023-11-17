package com.ssafy.showeat.job;


import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.test.JobLauncherTestUtils;
import org.springframework.batch.test.context.SpringBatchTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.ssafy.showeat.config.TestBatchConfig;
import com.ssafy.showeat.service.MessageService;
import com.ssafy.showeat.service.QrService;
import com.ssafy.showeat.service.s3.S3Service;
import com.ssafy.showeat.service.s3.config.AmazonS3Config;

@SpringBatchTest
@SpringBootTest
@ContextConfiguration(classes = {
	FinishFundingConfig.class,
	TestBatchConfig.class,
	QrService.class,
	S3Service.class,
	AmazonS3Config.class,
	MessageService.class,
	SendMmsNotificationItemWriter.class
})
class FinishFundingConfigTest {

	@Autowired
	private JobLauncherTestUtils jobLauncherTestUtils;

	@Test
	public void test_createCouponQrStep() throws Exception {

		// when
		JobExecution jobExecution = jobLauncherTestUtils.launchStep("createCouponQrStep");

		// then
		assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());
	}

	@Test
	public void test_sendCreateCouponNotificationStep() throws Exception {

		// when
		JobExecution jobExecution = jobLauncherTestUtils.launchStep("sendCreateCouponNotificationStep");

		// then
		assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());
	}


}