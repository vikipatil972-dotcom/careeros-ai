package com.careeros.domain.dto;

import java.time.Instant;
import java.util.List;

public record ResumeQualityReportResponse(
    String id,
    String resumeId,
    int readabilityScore,
    int toneScore,
    int atsCompatibilityIndex,
    List<String> strongSections,
    List<String> weakSections,
    List<String> grammarSuggestions,
    Instant createdAt
) {}
