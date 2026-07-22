package com.careeros.domain.dto;

import java.util.List;

public record AnswerEvaluationResponse(
    String questionId,
    int score,
    int technicalScore,
    int communicationScore,
    int starScore,
    List<String> strengths,
    List<String> weaknesses,
    String sampleAnswer,
    List<String> missingKeywords,
    List<String> improvementTips
) {}
