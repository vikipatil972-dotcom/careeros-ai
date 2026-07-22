package com.careeros.domain.dto;

import java.time.Instant;

public record AuditLogItem(
    String id,
    String adminId,
    String actionType,
    String targetUserId,
    String details,
    String ipAddress,
    Instant createdAt
) {}
