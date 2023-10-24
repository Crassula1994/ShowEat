package com.ssafy.showeat.domain.bookmark.service;

import org.springframework.stereotype.Service;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookMarkServiceImpl implements BookmarkService{

	private final UserRepository userRepository;
	private final BookmarkRepository bookmarkRepository;
	private final FundingRepository fundingRepository;

	@Override
	public void addBookmark(Long fundingId) {
		log.info("BookMarkServiceImpl_addBookMark || 관심 펀딩 추가 또는 삭제");
		Long userId = 1l;
		User loginUser = userRepository.findById(userId).get();
		Funding funding = fundingRepository.findById(fundingId).get();

		if(bookmarkRepository.existsByUserAndFunding(loginUser,funding))
			bookmarkRepository.delete(bookmarkRepository.findByUserAndFunding(loginUser,funding));
		else
			bookmarkRepository.save(Bookmark.builder().user(loginUser).funding(funding).build());
	}

	@Override
	public boolean isBookmark(User user, Funding funding) {
		log.info("BookMarkServiceImpl_isBookmark || 유저의 펀딩 참여 여부");
		if(bookmarkRepository.existsByUserAndFunding(user,funding))
			return true;
		return false;
	}

	@Override
	public int getBookmarkCountByFundingId(Long fundingId) {
		log.info("BookMarkServiceImpl_getBookmarkCountByFundingId || 펀딩의 좋아요 갯수 조회");
		return bookmarkRepository.countByFundingId(fundingId);
	}
}
