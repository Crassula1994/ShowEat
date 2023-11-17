package com.ssafy.showeat.domain.review.dto.response;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import com.ssafy.showeat.domain.review.entity.Review;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "펀딩 리뷰 리스트 조회 DTO" , description = "펀딩 리뷰들의 정보")
public class FundingReviewResponseDto {

	@ApiModelProperty(value = "리뷰 리스트")
	private List<ReviewResponseDto> reviewResponseDtos;

	@ApiModelProperty(value = "현재 페이지 번호")
	private int pageNumber;

	@ApiModelProperty(value = "한 페이지에 표시되는 데이터의 수")
	private int pageSize;

	@ApiModelProperty(value = "전체 데이터의 개수")
	private long totalElements;

	@ApiModelProperty(value = "전체 페이지 수")
	private int totalPages;

	@ApiModelProperty(value = "현재 페이지가 마지막 페이지인지의 여부")
	private boolean last;

	public static FundingReviewResponseDto createFundingReviewResponseDto(Page<Review> reviewInFunding){
		return FundingReviewResponseDto.builder()
					.reviewResponseDtos(reviewInFunding.getContent().stream().map(review -> review.toReviewResponseDto()).collect(
						Collectors.toList()))
					.pageNumber(reviewInFunding.getNumber())
					.pageSize(reviewInFunding.getSize())
					.totalElements(reviewInFunding.getTotalElements())
					.totalPages(reviewInFunding.getTotalPages())
					.last(reviewInFunding.isLast())
					.build();
	}
}
