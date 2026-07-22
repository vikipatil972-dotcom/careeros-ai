package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ResumeUpdateRequest(
    @NotBlank(message = "Resume title is required")
    String title,

    String targetJobTitle,

    @NotNull(message = "Structured resume data is required")
    StructuredResumeData structuredData
) {}
