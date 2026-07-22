package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record StartInterviewRequest(
    String resumeId,

    @NotBlank(message = "Company name is required")
    String companyName,

    @NotBlank(message = "Job role is required")
    String jobRole,

    @NotBlank(message = "Interview type is required")
    String interviewType, // 'HR', 'TECHNICAL', 'BEHAVIORAL', 'SYSTEM_DESIGN', 'MANAGERIAL', 'MIXED'

    @NotBlank(message = "Difficulty level is required")
    String difficultyLevel, // 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FAANG'

    int totalQuestions,

    String jobDescription
) {}
