package com.careeros.service.career;

import com.careeros.domain.dto.SkillGapAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillGapAnalyzer {

    public SkillGapAnalysisResponse analyzeGaps(String dreamRole, List<String> currentSkills) {
        List<String> missingSkills = List.of("Docker & Kubernetes Containerization", "Redis In-Memory Caching", "GraphQL Schema Design", "Prometheus Observability");
        List<String> missingTools = List.of("Terraform", "GitHub Actions CI/CD", "k6 Load Testing", "Helm Charts");
        List<String> missingSoftSkills = List.of("Technical Leadership", "Cross-Team Architecture Communication", "Mentorship");
        List<String> missingCertifications = List.of("AWS Certified Solutions Architect - Associate", "Certified Kubernetes Application Developer (CKAD)");
        List<String> missingProjects = List.of("Distributed Microservices API Gateway with Rate Limiter", "Real-time Event Streaming Platform with Apache Kafka");

        return new SkillGapAnalysisResponse(
            missingSkills,
            missingTools,
            missingSoftSkills,
            missingCertifications,
            missingProjects
        );
    }
}
