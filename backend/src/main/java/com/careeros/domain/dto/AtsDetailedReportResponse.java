package com.careeros.domain.dto;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public record AtsDetailedReportResponse(
    String id,
    String resumeId,
    int overallScore,
    CategoryScores categoryScores,
    List<KeywordItem> matchingKeywords,
    List<KeywordItem> missingKeywords,
    List<String> strengths,
    List<String> weaknesses,
    List<ChecklistItem> improvementChecklist,
    Instant createdAt
) {
    public record CategoryScores(
        int skillsMatch,         // Out of 20
        int keywordsMatch,       // Out of 15
        int experienceMatch,     // Out of 15
        int educationMatch,      // Out of 10
        int resumeStructure,     // Out of 10
        int actionVerbs,         // Out of 10
        int measurableAchievements, // Out of 10
        int formattingQuality,   // Out of 5
        int contactInfo,         // Out of 3
        int atsCompatibility     // Out of 2
    ) {}

    public record KeywordItem(
        String keyword,
        String category,
        String priority // HIGH, MEDIUM, LOW
    ) {}

    public record ChecklistItem(
        String category,
        String recommendation,
        String potentialImpact,
        boolean isCompleted
    ) {}
}
