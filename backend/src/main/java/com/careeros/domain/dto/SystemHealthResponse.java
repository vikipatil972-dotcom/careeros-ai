package com.careeros.domain.dto;

import java.time.Instant;

public record SystemHealthResponse(
    String status, // 'HEALTHY', 'DEGRADED', 'DOWN'
    double cpuUsagePercent,
    int memoryUsedMb,
    int activeDbConnections,
    long uptimeSeconds,
    Instant checkedAt
) {}
