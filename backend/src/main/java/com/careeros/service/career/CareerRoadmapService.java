package com.careeros.service.career;

import com.careeros.domain.dto.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class CareerRoadmapService {

    private final SkillGapAnalyzer skillGapAnalyzer;

    public CareerRoadmapService(SkillGapAnalyzer skillGapAnalyzer) {
        this.skillGapAnalyzer = skillGapAnalyzer;
    }

    public CareerRoadmapResponse generateRoadmap(CareerGoalRequest request) {
        String company = request.dreamCompany();
        String role = request.dreamRole();

        SkillGapAnalysisResponse gaps = skillGapAnalyzer.analyzeGaps(role, request.currentSkills());

        Map<String, Integer> categoryScores = Map.of(
            "Technical Skills", 82,
            "Resume Quality", 88,
            "ATS Score", 78,
            "Interview Readiness", 86,
            "Projects Portfolio", 80,
            "Certifications", 70,
            "Communication", 84
        );

        List<CareerRoadmapResponse.MilestoneItem> milestones = List.of(
            new CareerRoadmapResponse.MilestoneItem(
                "30_DAYS",
                "Phase 1: DevOps & Docker Containerization Foundation",
                List.of("Docker Multi-stage Builds", "Kubernetes Pods & Deployments"),
                List.of("Containerize Spring Boot & PostgreSQL with Docker Compose"),
                List.of("AWS Cloud Practitioner"),
                "15 Hours/Week: 1 Hr Daily Coding + Weekend Project Building"
            ),
            new CareerRoadmapResponse.MilestoneItem(
                "60_DAYS",
                "Phase 2: Redis Caching & Distributed Rate Limiter",
                List.of("Redis Sliding Window Rate Limiter", "Spring Data Redis Cacheable"),
                List.of("Build High-Throughput Rate-Limiting API Gateway"),
                List.of("AWS Solutions Architect Associate"),
                "18 Hours/Week: System Design Diagrams + LeetCode Mediums"
            ),
            new CareerRoadmapResponse.MilestoneItem(
                "90_DAYS",
                "Phase 3: FAANG System Design & STAR Interview Polish",
                List.of("Kafka Event Streaming", "High Availability & Lock Contention"),
                List.of("Deploy CareerOS Production Microservices Cluster"),
                List.of("CKAD Kubernetes Certification"),
                "20 Hours/Week: 2 Mock AI Interviews Weekly + Resume ATS Check"
            )
        );

        CareerRoadmapResponse.WeeklyProgressTracker tracker = new CareerRoadmapResponse.WeeklyProgressTracker(
            4, // Week 4
            12, // 12 Day Streak
            8,  // 8 Skills Completed
            2,  // 2 Projects Completed
            68  // 68% Progress
        );

        return new CareerRoadmapResponse(
            "roadmap_" + System.currentTimeMillis(),
            company,
            role,
            83, // Overall Career Readiness Score
            categoryScores,
            gaps,
            milestones,
            tracker,
            Instant.now()
        );
    }
}
