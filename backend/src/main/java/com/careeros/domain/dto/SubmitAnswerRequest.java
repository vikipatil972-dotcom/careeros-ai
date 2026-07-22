package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record SubmitAnswerRequest(
    @NotBlank(message = "Question ID is required")
    String questionId,

    @NotBlank(message = "Answer text is required")
    String userAnswerText,

    int secondsTaken
) {}
