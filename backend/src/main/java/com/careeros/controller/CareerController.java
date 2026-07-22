package com.careeros.controller;

import com.careeros.domain.dto.*;
import com.careeros.service.career.CareerRoadmapService;
import com.careeros.service.career.LearningRecommendationService;
import com.careeros.service.career.SkillGapAnalyzer;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/career")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class CareerController {

    private final CareerRoadmapService careerRoadmapService;
    private final SkillGapAnalyzer skillGapAnalyzer;
    private final LearningRecommendationService recommendationService;

    public CareerController(
            CareerRoadmapService careerRoadmapService,
            SkillGapAnalyzer skillGapAnalyzer,
            LearningRecommendationService recommendationService) {

        this.careerRoadmapService = careerRoadmapService;
        this.skillGapAnalyzer = skillGapAnalyzer;
        this.recommendationService = recommendationService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<SkillGapAnalysisResponse> analyzeGaps(@Valid @RequestBody CareerGoalRequest request) {
        SkillGapAnalysisResponse gaps = skillGapAnalyzer.analyzeGaps(request.dreamRole(), request.currentSkills());
        return ResponseEntity.ok(gaps);
    }

    @PostMapping("/roadmap")
    public ResponseEntity<CareerRoadmapResponse> generateRoadmap(@Valid @RequestBody CareerGoalRequest request) {
        CareerRoadmapResponse response = careerRoadmapService.generateRoadmap(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<CareerRoadmapResponse> getDashboard() {
        CareerGoalRequest defaultReq = new CareerGoalRequest("Google", "Senior Full Stack Engineer", List.of("Java", "React"), 3500000L, 6);
        CareerRoadmapResponse response = careerRoadmapService.generateRoadmap(defaultReq);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resources")
    public ResponseEntity<List<LearningResourceItem>> getResources(@RequestParam(value = "role", defaultValue = "Senior Software Engineer") String role) {
        List<LearningResourceItem> resources = recommendationService.getRecommendedResources(role);
        return ResponseEntity.ok(resources);
    }

    @PutMapping("/progress")
    public ResponseEntity<Map<String, Object>> updateProgress(@RequestParam int weekNumber, @RequestParam int streakDays) {
        return ResponseEntity.ok(Map.of(
            "message", "Weekly progress updated successfully!",
            "weekNumber", weekNumber,
            "streakDays", streakDays
        ));
    }

    @GetMapping("/history")
    public ResponseEntity<List<CareerRoadmapResponse>> getHistory() {
        CareerGoalRequest defaultReq = new CareerGoalRequest("Google", "Senior Full Stack Engineer", List.of("Java", "React"), 3500000L, 6);
        CareerRoadmapResponse response = careerRoadmapService.generateRoadmap(defaultReq);
        return ResponseEntity.ok(List.of(response));
    }
}
