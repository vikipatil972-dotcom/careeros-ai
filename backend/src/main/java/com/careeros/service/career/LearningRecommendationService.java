package com.careeros.service.career;

import com.careeros.domain.dto.LearningResourceItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningRecommendationService {

    public List<LearningResourceItem> getRecommendedResources(String dreamRole) {
        return List.of(
            new LearningResourceItem("res_1", "Java Spring Boot 3.3 Production Microservices", "YOUTUBE", "https://youtube.com", "Backend Architecture", "INTERMEDIATE"),
            new LearningResourceItem("res_2", "Official PostgreSQL Query Optimization & EXPLAIN Manual", "DOCUMENTATION", "https://postgresql.org/docs", "Database Performance", "ADVANCED"),
            new LearningResourceItem("res_3", "LeetCode & System Design Primer", "PRACTICE_PLATFORM", "https://leetcode.com", "Algorithms & System Design", "FAANG"),
            new LearningResourceItem("res_4", "Designing Data-Intensive Applications (Martin Kleppmann)", "BOOK", "https://oreilly.com", "Distributed Systems", "ADVANCED"),
            new LearningResourceItem("res_5", "CareerOS AI SaaS Reference Architecture", "GITHUB", "https://github.com", "Full Stack Enterprise", "INTERMEDIATE")
        );
    }
}
