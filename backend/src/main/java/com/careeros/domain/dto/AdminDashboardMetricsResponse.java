package com.careeros.domain.dto;

public record AdminDashboardMetricsResponse(
    long totalUsers,
    long activeUsers,
    long premiumUsers,
    long todaySignups,
    long monthlyRevenueInr,
    long totalRevenueInr,
    long totalAtsAnalyses,
    long totalAiRewrites,
    long totalCoverLetters,
    long totalInterviews,
    long totalCareerRoadmaps
) {}
