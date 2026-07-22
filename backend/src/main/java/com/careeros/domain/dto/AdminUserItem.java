package com.careeros.domain.dto;

import java.time.Instant;

public record AdminUserItem(
    String id,
    String email,
    String firstName,
    String lastName,
    String role, // 'ROLE_USER', 'ROLE_PREMIUM_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'
    boolean isBlocked,
    String planCode,
    Instant createdAt
) {}
