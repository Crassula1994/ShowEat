package com.ssafy.showeat.domain.notification.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.showeat.domain.notification.entity.Notification;
import com.ssafy.showeat.domain.user.entity.User;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

	@EntityGraph(attributePaths = "funding")
	Page<Notification> findNotificationWithFundingByUserAndNotificationIsChecked(
		User user, boolean isChecked, PageRequest of);

	@Modifying
	@Query("UPDATE Notification n "
		+ "SET n.notificationIsChecked = true "
		+ "WHERE n.user = :user "
		+ "AND n.notificationIsChecked = false ")
	void updateCheckedState(@Param("user") User user);
}