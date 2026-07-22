package com.careeros.service.ats;

import com.careeros.domain.dto.AtsDetailedReportResponse;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class AtsScoringEngine {

    private final KeywordExtractorService keywordExtractorService;

    public AtsScoringEngine(KeywordExtractorService keywordExtractorService) {
        this.keywordExtractorService = keywordExtractorService;
    }

    public AtsDetailedReportResponse calculateScore(String resumeId, String resumeText, String jobDescription) {
        Set<String> jdKeywords = keywordExtractorService.extractKeywordsFromText(jobDescription);
        Set<String> resumeKeywords = keywordExtractorService.extractKeywordsFromText(resumeText);

        Set<String> matching = new LinkedHashSet<>(jdKeywords);
        matching.retainAll(resumeKeywords);

        Set<String> missing = new LinkedHashSet<>(jdKeywords);
        missing.removeAll(resumeKeywords);

        // 1. Skills Match (Max 20)
        double skillRatio = jdKeywords.isEmpty() ? 1.0 : (double) matching.size() / jdKeywords.size();
        int skillsScore = (int) Math.round(skillRatio * 20);

        // 2. Keywords Match (Max 15)
        int keywordsScore = (int) Math.min(15, Math.round(matching.size() * 2.5));

        // 3. Experience Match (Max 15)
        int experienceScore = resumeText.toLowerCase().contains("senior") || resumeText.toLowerCase().contains("years") ? 14 : 10;

        // 4. Education Match (Max 10)
        int educationScore = resumeText.toLowerCase().contains("bachelor") || resumeText.toLowerCase().contains("degree") ? 10 : 6;

        // 5. Resume Structure (Max 10)
        int structureScore = (resumeText.contains("Experience") && resumeText.contains("Education") && resumeText.contains("Skills")) ? 10 : 7;

        // 6. Action Verbs (Max 10)
        int verbCount = keywordExtractorService.countActionVerbs(resumeText);
        int actionVerbsScore = Math.min(10, verbCount * 3);

        // 7. Measurable Achievements (Max 10)
        int metricsCount = keywordExtractorService.countMeasurableMetrics(resumeText);
        int achievementsScore = Math.min(10, metricsCount * 3);

        // 8. Formatting Quality (Max 5)
        int formattingScore = 5;

        // 9. Contact Info (Max 3)
        int contactScore = (resumeText.contains("@") && (resumeText.contains("linkedin") || resumeText.contains("github"))) ? 3 : 2;

        // 10. ATS Compatibility (Max 2)
        int compatibilityScore = 2;

        int totalScore = skillsScore + keywordsScore + experienceScore + educationScore + structureScore +
                         actionVerbsScore + achievementsScore + formattingScore + contactScore + compatibilityScore;

        AtsDetailedReportResponse.CategoryScores scores = new AtsDetailedReportResponse.CategoryScores(
            skillsScore,
            keywordsScore,
            experienceScore,
            educationScore,
            structureScore,
            actionVerbsScore,
            achievementsScore,
            formattingScore,
            contactScore,
            compatibilityScore
        );

        List<AtsDetailedReportResponse.KeywordItem> matchItems = matching.stream()
            .map(k -> new AtsDetailedReportResponse.KeywordItem(k, "Tech Stack", "HIGH"))
            .toList();

        List<AtsDetailedReportResponse.KeywordItem> missItems = missing.stream()
            .map(k -> new AtsDetailedReportResponse.KeywordItem(k, "Target Requirement", "HIGH"))
            .toList();

        List<String> strengths = List.of(
            "Strong hard technical skills alignment (" + matching.size() + " matching keywords).",
            "Clear section structural formatting (Experience, Education, Skills present).",
            "Included contact details and professional social links."
        );

        List<String> weaknesses = List.of(
            "Missing " + missing.size() + " key technical keywords required by job description.",
            "Could quantify accomplishments further using ROI metrics (%, $, scale)."
        );

        List<AtsDetailedReportResponse.ChecklistItem> checklist = List.of(
            new AtsDetailedReportResponse.ChecklistItem("Technical Skills", "Add missing keywords: " + String.join(", ", missing), "+12 Points", false),
            new AtsDetailedReportResponse.ChecklistItem("Action Verbs", "Use high-impact action verbs like Architected, Spearheaded, and Optimized", "+8 Points", false),
            new AtsDetailedReportResponse.ChecklistItem("Quantifiable ROI", "Add metrics (e.g. '% latency reduction', '$ cost savings') to bullet points", "+10 Points", false)
        );

        return new AtsDetailedReportResponse(
            "ats_" + System.currentTimeMillis(),
            resumeId,
            Math.min(100, Math.max(0, totalScore)),
            scores,
            matchItems,
            missItems,
            strengths,
            weaknesses,
            checklist,
            Instant.now()
        );
    }
}
