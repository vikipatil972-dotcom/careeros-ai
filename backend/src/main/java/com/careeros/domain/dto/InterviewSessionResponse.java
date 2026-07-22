package com.careeros.domain.dto;

import java.time.Instant;
import java.util.List;

public record InterviewSessionResponse(
    String id,
    String companyName,
    String jobRole,
    String interviewType,
    String difficultyLevel,
    int totalQuestions,
    int currentQuestionIndex,
    boolean isCompleted,
    int overallScore,
    List<QuestionItem> questions,
    Instant createdAt
) {
    public record QuestionItem(
        String id,
        int questionNumber,
        String questionText,
        String category,
        String expectedStructure
    ) {}
}
