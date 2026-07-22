package com.careeros.domain.dto;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public record CareerRoadmapResponse(
    String id,
    String dreamCompany,
    String dreamRole,
    int readinessScore,
    Map<String, Integer> categoryScores,
    SkillGapAnalysisResponse skillGaps,
    List<MilestoneItem> milestones,
    WeeklyProgressTracker weeklyTracker,
    Instant createdAt
) {
    public record MilestoneItem(
        String phase, // '30_DAYS', '60_DAYS', '90_DAYS', '6_MONTHS', '12_MONTHS'
        String title,
        List<String> skillsToLearn,
        List<String> projectsToBuild,
        List<String> certificationsToEarn,
        String practiceSchedule
    ) {}

    public record WeeklyProgressTracker(
        int weekNumber,
        int streakDays,
        int skillsCompleted,
        int projectsCompleted,
        int progressPercent
    ) {}
}
