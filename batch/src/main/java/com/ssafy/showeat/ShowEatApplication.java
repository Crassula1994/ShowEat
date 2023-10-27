package com.ssafy.showeat;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@EnableBatchProcessing
@SpringBootApplication
public class ShowEatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShowEatApplication.class, args);
	}

}
