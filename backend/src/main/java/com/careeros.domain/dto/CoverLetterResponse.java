package com.careeros.domain.dto;

import java.time.Instant;

public record CoverLetterResponse(
    String id,
    String companyName,
    String jobTitle,
    String stylePreset,
    String fullContent,
    String greeting,
    String openingParagraph,
    String valuePropParagraph,
    String skillsParagraph,
    String closingParagraph,
    String signature,
    Instant createdAt
) {}
