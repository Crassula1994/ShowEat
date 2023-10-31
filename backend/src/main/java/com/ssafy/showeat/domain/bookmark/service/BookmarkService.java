package com.ssafy.showeat.domain.bookmark.service;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface BookmarkService {
	void addBookmark(Long fundingId , User user);
	boolean isBookmark(User user, Funding funding);
	int getBookmarkCountByFundingId(Long fundingId);
}
