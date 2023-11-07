package com.ssafy.showeat.domain.coupon.dto.response;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import com.ssafy.showeat.domain.coupon.entity.Coupon;

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
@ApiModel(value = "상태별 쿠폰 리스트 조회 DTO", description = "상태별 쿠폰들의 정보")
public class CouponPageResponseDto {

	@ApiModelProperty(value = "쿠폰 리스트")
	private List<CouponListResponseDto> couponListResponseDtos;

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

	public static CouponPageResponseDto createCouponPageResponseDto(Page<Coupon> couponList) {
		return CouponPageResponseDto.builder()
			.couponListResponseDtos(
				couponList.getContent().stream().map(coupon -> coupon.toCouponListResponseDto()).collect(
					Collectors.toList()))
			.pageNumber(couponList.getNumber())
			.pageSize(couponList.getSize())
			.totalElements(couponList.getTotalElements())
			.totalPages(couponList.getTotalPages())
			.last(couponList.isLast())
			.build();
	}
}
