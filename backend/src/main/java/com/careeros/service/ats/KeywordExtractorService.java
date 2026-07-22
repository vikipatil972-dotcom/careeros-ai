package com.careeros.service.ats;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class KeywordExtractorService {

    private static final List<String> TECH_DICTIONARY = List.of(
        "java", "spring boot", "react", "typescript", "javascript", "postgresql", "mysql", "redis",
        "docker", "kubernetes", "aws", "microservices", "rest api", "graphql", "ci/cd", "github actions",
        "html", "css", "tailwind", "python", "golang", "node.js", "express", "kafka", "rabbitmq",
        "prometheus", "grafana", "junit", "mockito", "git", "maven", "gradle", "system design"
    );

    private static final List<String> ACTION_VERBS = List.of(
        "architected", "spearheaded", "engineered", "optimized", "developed", "implemented",
        "reduced", "increased", "built", "managed", "designed", "launched", "migrated"
    );

    public Set<String> extractKeywordsFromText(String text) {
        if (text == null || text.isBlank()) {
            return Collections.emptySet();
        }

        String lower = text.toLowerCase();
        Set<String> found = new LinkedHashSet<>();

        for (String tech : TECH_DICTIONARY) {
            if (lower.contains(tech)) {
                found.add(tech);
            }
        }
        return found;
    }

    public int countActionVerbs(String text) {
        if (text == null || text.isBlank()) return 0;
        String lower = text.toLowerCase();
        int count = 0;
        for (String verb : ACTION_VERBS) {
            if (lower.contains(verb)) {
                count++;
            }
        }
        return count;
    }

    public int countMeasurableMetrics(String text) {
        if (text == null || text.isBlank()) return 0;
        Pattern pattern = Pattern.compile("(\\d+%|\\$\\d+|\\d+\\s*(k|m|b|users|ms|seconds|x|hrs))", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        int count = 0;
        while (matcher.find()) {
            count++;
        }
        return count;
    }
}
