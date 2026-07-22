package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record AtsAnalysisRequest(
    @NotBlank(message = "Resume ID is required")
    String resumeId,

    @NotBlank(message = "Target job description is required")
    String targetJobDescription
) {}
