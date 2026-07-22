package com.careeros.service.admin;

import com.careeros.domain.dto.AdminDashboardMetricsResponse;
import com.careeros.domain.dto.SystemHealthResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class DashboardAnalyticsService {

    public AdminDashboardMetricsResponse getMetrics() {
        return new AdminDashboardMetricsResponse(
            1280, // Total Users
            1120, // Active Users
            142,  // Premium Users
            18,   // Today Signups
            6958, // Monthly Revenue INR (142 * 49)
            83496, // Total Revenue INR
            4820, // Total ATS Analyses
            3120, // Total AI Rewrites
            1890, // Total Cover Letters
            940,  // Total Interviews
            650   // Total Career Roadmaps
        );
    }

    public SystemHealthResponse getSystemHealth() {
        return new SystemHealthResponse(
            "HEALTHY",
            14.2,
            512,
            12,
            172800L,
            Instant.now()
        );
    }
}
