package com.careeros.service.coverletter;

import com.careeros.domain.dto.CoverLetterRequest;
import com.careeros.domain.dto.CoverLetterResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CoverLetterService {

    public CoverLetterResponse generateCoverLetter(CoverLetterRequest request) {
        String company = request.companyName();
        String title = request.jobTitle();
        String preset = request.stylePreset();

        String greeting = "Dear Hiring Manager at " + company + ",";
        
        String opening = "I am writing to express my enthusiastic interest in the " + title + " position at " + company +
                         ". With over 4+ years of hands-on experience engineering high-concurrency microservices, robust backend architectures in Java Spring Boot, and modern React 18 frontends, I am eager to contribute to your engineering goals.";

        String valueProp = "In my recent role, I architected distributed systems handling over 120K daily active transactions while reducing API latency by 38%. My approach combines rigorous software engineering standards with empirical benchmarking to deliver resilient product features.";

        String skills = "My technical background aligns directly with " + company + "'s requirements, including Java 21, Spring Boot 3.3, React 18, TypeScript, PostgreSQL 16, and Docker containerization. I thrive in collaborative Agile teams where clean architecture and rapid iteration are prioritized.";

        String closing = "I would welcome the opportunity to discuss how my technical expertise and background can add immediate value to the " + title + " team at " + company + ". Thank you for your time and consideration.";

        String signature = "Sincerely,\nRahul Sharma\nSenior Full Stack Engineer";

        String fullContent = String.join("\n\n", List.of(greeting, opening, valueProp, skills, closing, signature));

        return new CoverLetterResponse(
            "cl_" + System.currentTimeMillis(),
            company,
            title,
            preset,
            fullContent,
            greeting,
            opening,
            valueProp,
            skills,
            closing,
            signature,
            Instant.now()
        );
    }
}
