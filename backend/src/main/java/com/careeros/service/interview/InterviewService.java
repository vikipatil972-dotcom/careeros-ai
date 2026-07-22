package com.careeros.service.interview;

import com.careeros.domain.dto.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class InterviewService {

    private final InterviewQuestionEngine questionEngine;
    private final InterviewEvaluationService evaluationService;

    public InterviewService(InterviewQuestionEngine questionEngine, InterviewEvaluationService evaluationService) {
        this.questionEngine = questionEngine;
        this.evaluationService = evaluationService;
    }

    public InterviewSessionResponse startSession(StartInterviewRequest request) {
        int count = request.totalQuestions() > 0 ? request.totalQuestions() : 3;
        List<InterviewSessionResponse.QuestionItem> questions = questionEngine.generateQuestions(
            request.jobRole(),
            request.interviewType(),
            request.difficultyLevel(),
            count
        );

        return new InterviewSessionResponse(
            "sess_" + System.currentTimeMillis(),
            request.companyName(),
            request.jobRole(),
            request.interviewType(),
            request.difficultyLevel(),
            questions.size(),
            0,
            false,
            0,
            questions,
            Instant.now()
        );
    }

    public AnswerEvaluationResponse submitAnswer(SubmitAnswerRequest request) {
        return evaluationService.evaluateAnswer(request.questionId(), request.userAnswerText());
    }

    public InterviewReportResponse getReport(String sessionId) {
        Map<String, Integer> skillScores = Map.of(
            "System Design & Architecture", 88,
            "Backend Java Spring Boot", 92,
            "Database & Query Tuning", 84,
            "Communication & STAR Method", 78
        );

        List<InterviewReportResponse.RoadmapStep> roadmap = List.of(
            new InterviewReportResponse.RoadmapStep("STAR Method Quantified Metrics", "Practice framing results with '% latency reduction' and '$ ROI'", "2 Hours"),
            new InterviewReportResponse.RoadmapStep("Database Lock Contention", "Review PostgreSQL GIN indexes & isolation levels", "3 Hours")
        );

        return new InterviewReportResponse(
            "rep_" + System.currentTimeMillis(),
            sessionId,
            "Google",
            "Senior Full Stack Engineer",
            86,
            skillScores,
            List.of("Distributed Rate Limiting", "Quantified ROI Metrics"),
            List.of("Spring Boot Microservices", "PostgreSQL Indexing", "REST API Security"),
            roadmap,
            480,
            Instant.now()
        );
    }
}
