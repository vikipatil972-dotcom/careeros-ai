package com.careeros.domain.dto;

import java.util.List;
import java.util.Map;

public record StructuredResumeData(
    ContactInfo contactInfo,
    String summary,
    List<WorkExperience> workExperience,
    List<EducationItem> education,
    SkillBreakdown skills,
    List<ProjectItem> projects,
    List<String> certifications,
    List<String> languages,
    Map<String, String> links
) {
    public record ContactInfo(
        String name,
        String email,
        String phone,
        String location,
        String linkedin,
        String github,
        String portfolio
    ) {}

    public record WorkExperience(
        String company,
        String role,
        String startDate,
        String endDate,
        List<String> bulletPoints
    ) {}

    public record EducationItem(
        String institution,
        String degree,
        String field,
        String graduationYear,
        String grade
    ) {}

    public record SkillBreakdown(
        List<String> hardSkills,
        List<String> softSkills,
        List<String> tools
    ) {}

    public record ProjectItem(
        String name,
        String description,
        List<String> technologiesUsed,
        String liveUrl
    ) {}
}
