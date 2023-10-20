package com.ssafy.showeat.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Controller
public class SwaggerConfig {

	/**
	 * Swagger를 위한 Docket 빈을 추가한다.
	 */
	@Bean
	public Docket api() {
		final ApiInfo apiInfo = new ApiInfoBuilder()
			.title("ShowEat API")
			.description("<h3>ShowEat 문서를 제공</h3>")
			.version("1.0")
			.build();

		return new Docket(DocumentationType.SWAGGER_2)		// Swagger 2.0 기반의 문서 작성
			.useDefaultResponseMessages(false) 			// Default 메세지 삭제
			.apiInfo(apiInfo) 							// 문서에 대한 정보를 설정한다.
			.select()									// ApiSelectorBuilder를 반환하며 상세한 설정 처리
			.apis(RequestHandlerSelectors.basePackage("com.ssafy.showeat"))// 대상으로하는 api 설정
			.paths(PathSelectors.ant("/**/api/**"))	// controller에서 swagger를 지정할 대상 path 설정
			.build();									// Docket 객체 생성
	}
}
