package com.careeros.domain.dto;

public record LearningResourceItem(
    String id,
    String title,
    String resourceType, // 'YOUTUBE', 'DOCUMENTATION', 'PRACTICE_PLATFORM', 'BOOK', 'GITHUB'
    String url,
    String category,
    String difficultyLevel // 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'
) {}
