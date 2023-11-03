package com.ssafy.showeat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.showeat.domain.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
