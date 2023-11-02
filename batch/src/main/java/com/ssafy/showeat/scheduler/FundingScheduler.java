package com.ssafy.showeat.scheduler;

import java.time.LocalDateTime;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionException;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class FundingScheduler {

	private final Job finishFundingJob;
	private final JobLauncher jobLauncher;

	// 1시간 마다 실행
	@Scheduled(cron = "*/30 * * * * *")
	public void executeJob () {
		try {
			log.info("fetch gas station job start");
			jobLauncher.run(
				finishFundingJob,
				new JobParametersBuilder()
					.addString("datetime", LocalDateTime.now().toString())
					.toJobParameters()  // job parameter 설정
			);
			log.info("successfully complete job");
		} catch (JobExecutionException ex) {
			System.out.println(ex.getMessage());
			ex.printStackTrace();
		}
	}
}
