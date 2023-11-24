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
import com.ssafy.showeat.kafka.KafkaProducer;
import com.ssafy.showeat.kafka.KafkaProducerConfig;
import com.ssafy.showeat.service.MessageService;

@SpringBatchTest
@SpringBootTest
@ContextConfiguration(classes = {
	SendNotificationBeforeFinishFundingJobConfig.class,
	TestBatchConfig.class,
	SendNotificationItemWriter.class,
	MessageService.class,
	KafkaProducer.class,
	KafkaProducerConfig.class
})
public class SendNotificationBeforeFinishFundingJobConfigTest {
	@Autowired
	private JobLauncherTestUtils jobLauncherTestUtils;

	@Test
	public void test_addNotificationStep() throws Exception {

		// when
		JobExecution jobExecution = jobLauncherTestUtils.launchStep("addNotificationStep");

		// then
		assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());

	}

	@Test
	public void test_sendNotificationStep() throws Exception {

		// when
		JobExecution jobExecution = jobLauncherTestUtils.launchStep("sendNotificationStep");

		// then
		assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());

	}

}
