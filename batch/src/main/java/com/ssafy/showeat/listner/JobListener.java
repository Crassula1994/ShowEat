package com.ssafy.showeat.listner;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JobListener implements JobExecutionListener {

	@Override
	public void beforeJob(JobExecution jobExecution) {
		log.info("---------------Funding Batch 시작---------------");
	}

	@Override
	public void afterJob(JobExecution jobExecution) {
		long time = jobExecution.getEndTime().getTime() - jobExecution.getStartTime().getTime();
		log.info("---------------Funding Batch 종료---------------");
		log.info("총 소요시간 : {}", time);
	}
}
