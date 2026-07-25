package com.careeros.domain.dto;

import java.time.Instant;
import java.time.LocalDate;

public record JobApplicationDTO(
    String id,
    String userId,
    String companyName,
    String jobTitle,
    String status, // 'WISHLIST', 'APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED'
    long salaryOfferedInr,
    String location,
    String jobUrl,
    String notes,
    LocalDate appliedDate,
    Instant createdAt
) {}
