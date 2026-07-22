package com.careeros.domain.dto;

import java.time.Instant;

public record ResumeUploadResponse(
    String id,
    String title,
    String targetJobTitle,
    int versionNumber,
    String fileHash,
    String fileFormat,
    long fileSizeBytes,
    boolean isDuplicateDetected,
    StructuredResumeData structuredData,
    Instant createdAt
) {}
