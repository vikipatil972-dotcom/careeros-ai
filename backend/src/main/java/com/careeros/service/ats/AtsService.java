package com.careeros.service.ats;

import com.careeros.domain.dto.AtsAnalysisRequest;
import com.careeros.domain.dto.AtsDetailedReportResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtsService {

    private final AtsScoringEngine atsScoringEngine;

    public AtsService(AtsScoringEngine atsScoringEngine) {
        this.atsScoringEngine = atsScoringEngine;
    }

    public AtsDetailedReportResponse runAnalysis(AtsAnalysisRequest request) {
        String mockResumeText = "Rahul Sharma. Senior Full Stack Engineer. Java 21, Spring Boot 3.3, React 18, TypeScript, PostgreSQL 16, REST API, Microservices. Architected 14 Spring Boot microservices, reducing API execution latency by 38% across 120K daily active transactions. Bachelor of Science in Computer Science 2020.";
        return atsScoringEngine.calculateScore(request.resumeId(), mockResumeText, request.targetJobDescription());
    }

    public AtsDetailedReportResponse getLatestAnalysis(String resumeId) {
        String mockJd = "Senior Software Engineer requiring Java Spring Boot, React, PostgreSQL, Docker, Kubernetes, microservices, Redis caching.";
        return runAnalysis(new AtsAnalysisRequest(resumeId, mockJd));
    }

    public List<AtsDetailedReportResponse> getAnalysisHistory(String resumeId) {
        AtsDetailedReportResponse latest = getLatestAnalysis(resumeId);
        return List.of(latest);
    }

    public void deleteAnalysis(String analysisId) {
        // Purge record implementation
    }
}
