package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record CoverLetterRequest(
    String resumeId,

    @NotBlank(message = "Company name is required")
    String companyName,

    @NotBlank(message = "Job title is required")
    String jobTitle,

    @NotBlank(message = "Style preset is required")
    String stylePreset, // 'PROFESSIONAL', 'ATS_OPTIMIZED', 'FORMAL', 'FRIENDLY', 'TECHNICAL', 'EXECUTIVE'

    String jobDescription
) {}
