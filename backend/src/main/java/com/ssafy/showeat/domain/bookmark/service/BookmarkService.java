package com.ssafy.showeat.domain.bookmark.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface BookmarkService {
	void addBookmark(Long fundingId , User user);
	boolean isBookmark(User user, Funding funding);
	int getBookmarkCountByFundingId(Long fundingId);
	Page<Bookmark> getUserBookmarkFundingList(User user,int page, Pageable pageable);
}
