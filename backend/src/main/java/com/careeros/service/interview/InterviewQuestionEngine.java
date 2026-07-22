package com.careeros.service.interview;

import com.careeros.domain.dto.InterviewSessionResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterviewQuestionEngine {

    public List<InterviewSessionResponse.QuestionItem> generateQuestions(String jobRole, String interviewType, String difficultyLevel, int count) {
        List<InterviewSessionResponse.QuestionItem> questions = new ArrayList<>();

        if ("TECHNICAL".equalsIgnoreCase(interviewType) || "SYSTEM_DESIGN".equalsIgnoreCase(interviewType)) {
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_101", 1,
                "How do you prevent database connection pool exhaustion when executing high-latency third-party REST API calls in Spring Boot?",
                "Backend Architecture",
                "Mention Virtual Threads / @Async pools, micro-scoped @Transactional boundaries, and HikariCP connection tuning."
            ));
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_102", 2,
                "Walk me through a high-concurrency SQL query optimization strategy using EXPLAIN ANALYZE in PostgreSQL.",
                "Database Performance",
                "Explain reading query execution plan, identifying Seq Scans, building composite / GIN indexes, and avoiding N+1 selects."
            ));
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_103", 3,
                "Design a distributed rate-limiter for an enterprise API gateway handling 100K requests per second.",
                "System Design",
                "Discuss Redis Sliding Window Log or Token Bucket algorithm, distributed Redis cluster key partitioning, and 429 Too Many Requests response headers."
            ));
        } else if ("BEHAVIORAL".equalsIgnoreCase(interviewType) || "MANAGERIAL".equalsIgnoreCase(interviewType)) {
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_101", 1,
                "Describe a scenario where you disagreed with a Tech Lead on architectural choices. How did you resolve it?",
                "Conflict Resolution (STAR)",
                "Structure using STAR format: Situation, Task, Action (empirically benchmarking options), and Result."
            ));
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_102", 2,
                "Tell me about a production outage you caused or handled. What post-mortem steps did you take?",
                "Ownership & Resilience",
                "Discuss immediate mitigation, root cause analysis (RCA), blameless post-mortem, and automated regression test prevention."
            ));
        } else {
            // Mixed Default Questions
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_101", 1,
                "Tell me about yourself and your background designing microservices in Java Spring Boot and React.",
                "Professional Overview",
                "Concise 2-minute elevator pitch highlighting core technical background, key metrics, and career goals."
            ));
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_102", 2,
                "How do you ensure state persistence and seamless data synchronization between React 18 frontend components and backend REST APIs?",
                "Full Stack Architecture",
                "Explain React Query / TanStack Query, optimistic UI updates, error boundary fallback, and JWT token refresh retry loops."
            ));
            questions.add(new InterviewSessionResponse.QuestionItem(
                "q_103", 3,
                "Why do you want to join " + jobRole + " roles, and where do you see your technical leadership in 3 years?",
                "Career Trajectory",
                "Align personal technical growth with company product impact and engineering excellence."
            ));
        }

        return questions;
    }
}
