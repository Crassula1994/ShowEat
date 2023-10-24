package com.ssafy.showeat.domain.bookmark.service;

import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;

public interface BookmarkService {
	void addBookmark(Long fundingId);
	boolean isBookmark(User user, Funding funding);
}
