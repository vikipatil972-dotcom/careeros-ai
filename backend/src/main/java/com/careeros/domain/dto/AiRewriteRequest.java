package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record AiRewriteRequest(
    @NotBlank(message = "Resume ID is required")
    String resumeId,

    @NotBlank(message = "Section name is required")
    String sectionName, // 'SUMMARY', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'BULLET'

    @NotBlank(message = "Style preset is required")
    String stylePreset, // 'PROFESSIONAL', 'ATS_OPTIMIZED', 'TECHNICAL', 'LEADERSHIP', 'CONCISE'

    @NotBlank(message = "Original content is required")
    String originalContent,

    String targetRoleTitle
) {}
