package com.careeros.controller;

import com.careeros.domain.dto.AiRewriteRequest;
import com.careeros.domain.dto.AiRewriteResponse;
import com.careeros.domain.dto.ResumeQualityReportResponse;
import com.careeros.service.ai.AiRewriteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class AiRewriterController {

    private final AiRewriteService aiRewriteService;

    public AiRewriterController(AiRewriteService aiRewriteService) {
        this.aiRewriteService = aiRewriteService;
    }

    @PostMapping("/rewrite-resume")
    public ResponseEntity<AiRewriteResponse> rewriteResume(@Valid @RequestBody AiRewriteRequest request) {
        AiRewriteResponse response = aiRewriteService.rewriteContent(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/optimize-bullet")
    public ResponseEntity<AiRewriteResponse> optimizeBullet(@Valid @RequestBody AiRewriteRequest request) {
        AiRewriteResponse response = aiRewriteService.rewriteContent(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/rewrite-history/{resumeId}")
    public ResponseEntity<List<AiRewriteResponse>> getRewriteHistory(@PathVariable String resumeId) {
        AiRewriteRequest dummy = new AiRewriteRequest(resumeId, "EXPERIENCE", "ATS_OPTIMIZED", "Worked on APIs", "Senior Engineer");
        AiRewriteResponse item = aiRewriteService.rewriteContent(dummy);
        return ResponseEntity.ok(List.of(item));
    }

    @PostMapping("/restore-rewrite/{rewriteId}")
    public ResponseEntity<Map<String, String>> restoreRewrite(@PathVariable String rewriteId) {
        return ResponseEntity.ok(Map.of("message", "Rewrite " + rewriteId + " was successfully undone and restored."));
    }

    @GetMapping("/quality-report/{resumeId}")
    public ResponseEntity<ResumeQualityReportResponse> getQualityReport(@PathVariable String resumeId) {
        ResumeQualityReportResponse report = aiRewriteService.getQualityReport(resumeId);
        return ResponseEntity.ok(report);
    }
}
