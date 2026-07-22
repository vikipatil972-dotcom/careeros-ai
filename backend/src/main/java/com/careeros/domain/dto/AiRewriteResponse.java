package com.careeros.domain.dto;

import java.time.Instant;
import java.util.List;

public record AiRewriteResponse(
    String id,
    String resumeId,
    String sectionName,
    String stylePreset,
    String originalContent,
    String rewrittenContent,
    int scoreBefore,
    int scoreAfter,
    int scoreDelta,
    String explanation,
    List<String> keywordsAdded,
    String providerName,
    Instant createdAt
) {}
