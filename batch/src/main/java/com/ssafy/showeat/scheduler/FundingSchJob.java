package com.ssafy.showeat.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.util.Date;

@RequiredArgsConstructor
@Component
@Slf4j
public class FundingSchJob extends QuartzJobBean {

	private final Job finishFundingJob;
	private final JobLauncher jobLauncher;

	@SneakyThrows
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		JobParameters jobParameters = new JobParametersBuilder()
			.addLong("id", new Date().getTime())
			.toJobParameters();
		JobExecution jobExecution = jobLauncher.run(finishFundingJob, jobParameters);
	}
}
