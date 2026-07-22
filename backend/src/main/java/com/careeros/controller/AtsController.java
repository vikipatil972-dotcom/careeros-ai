package com.careeros.controller;

import com.careeros.domain.dto.AtsAnalysisRequest;
import com.careeros.domain.dto.AtsDetailedReportResponse;
import com.careeros.service.ats.AtsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ats")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class AtsController {

    private final AtsService atsService;

    public AtsController(AtsService atsService) {
        this.atsService = atsService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AtsDetailedReportResponse> analyzeResume(@Valid @RequestBody AtsAnalysisRequest request) {
        AtsDetailedReportResponse response = atsService.runAnalysis(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/latest/{resumeId}")
    public ResponseEntity<AtsDetailedReportResponse> getLatestAnalysis(@PathVariable String resumeId) {
        AtsDetailedReportResponse response = atsService.getLatestAnalysis(resumeId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history/{resumeId}")
    public ResponseEntity<List<AtsDetailedReportResponse>> getAnalysisHistory(@PathVariable String resumeId) {
        List<AtsDetailedReportResponse> history = atsService.getAnalysisHistory(resumeId);
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/analysis/{analysisId}")
    public ResponseEntity<Map<String, String>> deleteAnalysis(@PathVariable String analysisId) {
        atsService.deleteAnalysis(analysisId);
        return ResponseEntity.ok(Map.of("message", "ATS Analysis " + analysisId + " successfully deleted."));
    }
}
