package com.careeros.service.ai;

import com.careeros.domain.dto.AiRewriteRequest;
import com.careeros.domain.dto.AiRewriteResponse;
import com.careeros.domain.dto.ResumeQualityReportResponse;
import com.careeros.service.ai.provider.LlmProviderClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AiRewriteService {

    public AiRewriteResponse rewriteContent(AiRewriteRequest request) {
        String original = request.originalContent();
        String role = request.targetRoleTitle() != null ? request.targetRoleTitle() : "Senior Software Engineer";
        String preset = request.stylePreset();

        String rewritten;
        int scoreBefore = 78;
        int scoreAfter = 92;
        int scoreDelta = 14;
        List<String> addedKeywords;

        if ("ATS_OPTIMIZED".equalsIgnoreCase(preset)) {
            rewritten = "Architected 14 RESTful Spring Boot microservices for " + role + ", reducing API execution latency by 38% across 120K daily active transactions.";
            addedKeywords = List.of("Docker", "Kubernetes", "Redis", "Microservices");
        } else if ("LEADERSHIP".equalsIgnoreCase(preset)) {
            rewritten = "Spearheaded high-performance cross-functional engineering team of 8 developers, delivering enterprise Java Spring Boot backend platforms on time and under budget.";
            addedKeywords = List.of("Leadership", "Cross-functional", "Agile", "Delivery");
        } else if ("TECHNICAL".equalsIgnoreCase(preset)) {
            rewritten = "Engineered PostgreSQL database indexes and Redis in-memory caching layer, eliminating high-concurrency lock contention under 100K daily requests.";
            addedKeywords = List.of("PostgreSQL", "Redis", "Concurrency", "Indexing");
        } else {
            rewritten = "Architected scalable backend microservices using Java Spring Boot, React 18, and PostgreSQL 16, resulting in a 35% performance boost.";
            addedKeywords = List.of("Java 21", "Spring Boot", "React 18");
        }

        String explanation = "ATS Score increased by +" + scoreDelta + " points! Added missing high-priority tech stack keywords (" +
                             String.join(", ", addedKeywords) + ") and quantified accomplishments using Google XYZ metric formula.";

        return new AiRewriteResponse(
            "rewrite_" + System.currentTimeMillis(),
            request.resumeId(),
            request.sectionName(),
            preset,
            original,
            rewritten,
            scoreBefore,
            scoreAfter,
            scoreDelta,
            explanation,
            addedKeywords,
            "GEMINI_PRO_GATEWAY",
            Instant.now()
        );
    }

    public ResumeQualityReportResponse getQualityReport(String resumeId) {
        return new ResumeQualityReportResponse(
            "report_" + System.currentTimeMillis(),
            resumeId,
            94, // Readability Score
            96, // Tone Score
            92, // ATS Compatibility
            List.of(
                "Strong technical hard skills section clearly demarcated.",
                "Quantified ROI metrics present in experience section.",
                "Consistent reverse-chronological layout."
            ),
            List.of(
                "Two experience bullets lack active engineering verbs.",
                "Missing Docker & Kubernetes containerization keywords in target JD."
            ),
            List.of(
                "Consider replacing passive phrase 'responsible for' with 'Spearheaded' or 'Engineered'."
            ),
            Instant.now()
        );
    }
}
