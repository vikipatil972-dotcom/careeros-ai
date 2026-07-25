package com.careeros.domain.dto;

import java.time.Instant;

public record UserNotificationDTO(
    String id,
    String userId,
    String title,
    String message,
    String category, // 'SYSTEM', 'ATS_ALERT', 'INTERVIEW_REMINDER', 'BILLING'
    boolean isRead,
    Instant createdAt
) {}
