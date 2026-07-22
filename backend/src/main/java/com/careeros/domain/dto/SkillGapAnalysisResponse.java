package com.careeros.domain.dto;

import java.util.List;

public record SkillGapAnalysisResponse(
    List<String> missingSkills,
    List<String> missingTools,
    List<String> missingSoftSkills,
    List<String> missingCertifications,
    List<String> missingProjects
) {}
