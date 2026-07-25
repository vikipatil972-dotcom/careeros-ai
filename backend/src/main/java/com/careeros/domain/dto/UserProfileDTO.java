package com.careeros.domain.dto;

import java.util.List;

public record UserProfileDTO(
    String id,
    String userId,
    String firstName,
    String lastName,
    String email,
    String headline,
    String bio,
    String linkedinUrl,
    String githubUrl,
    String portfolioUrl,
    String phone,
    String location,
    long targetSalaryInr,
    List<String> preferredRoles
) {}
