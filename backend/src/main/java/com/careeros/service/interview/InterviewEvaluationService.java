package com.careeros.service.interview;

import com.careeros.domain.dto.AnswerEvaluationResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewEvaluationService {

    public AnswerEvaluationResponse evaluateAnswer(String questionId, String userAnswerText) {
        int length = userAnswerText != null ? userAnswerText.length() : 0;

        int techScore = Math.min(40, Math.max(25, length / 10));
        int commScore = Math.min(30, Math.max(20, length / 12));
        int starScore = Math.min(30, Math.max(18, length / 15));
        int totalScore = techScore + commScore + starScore;

        List<String> strengths = List.of(
            "Clear technical terminology used (Spring Boot, REST API, Microservices).",
            "Structured response addressing core problem constraints."
        );

        List<String> weaknesses = List.of(
            "Could quantify impact further (e.g. '% latency reduction' or '$ cost savings').",
            "Elaborate more on error handling and fallback strategies."
        );

        String sampleAnswer = "In my previous project, we decoupled database operations from third-party API calls using Spring Boot Virtual Threads (@Async). This reduced thread blocking, keeping HikariCP pool utilization under 20% and improving overall throughput by 42%.";

        List<String> missingKeywords = List.of("Virtual Threads", "HikariCP Pool", "Circuit Breaker");
        List<String> improvementTips = List.of(
            "Follow the STAR format explicitly: Situation -> Task -> Action -> Result.",
            "Always include at least one concrete numerical metric in your engineering results."
        );

        return new AnswerEvaluationResponse(
            questionId,
            totalScore,
            techScore,
            commScore,
            starScore,
            strengths,
            weaknesses,
            sampleAnswer,
            missingKeywords,
            improvementTips
        );
    }
}
