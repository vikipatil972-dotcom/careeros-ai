package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CareerGoalRequest(
    @NotBlank(message = "Dream company is required")
    String dreamCompany,

    @NotBlank(message = "Dream job role is required")
    String dreamRole,

    List<String> currentSkills,

    long targetSalaryInr,

    int targetTimelineMonths
) {}
