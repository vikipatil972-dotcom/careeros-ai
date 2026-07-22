package com.careeros.domain.dto;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public record InterviewReportResponse(
    String id,
    String sessionId,
    String companyName,
    String jobRole,
    int overallScore,
    Map<String, Integer> skillScores,
    List<String> weakTopics,
    List<String> strongTopics,
    List<RoadmapStep> roadmap,
    int totalDurationSeconds,
    Instant createdAt
) {
    public record RoadmapStep(
        String topic,
        String actionItem,
        String estimatedTime
    ) {}
}
