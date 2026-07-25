package com.careeros.controller;

import com.careeros.domain.dto.JobApplicationDTO;
import com.careeros.service.tracker.JobTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tracker")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class JobTrackerController {

    private final JobTrackerService jobTrackerService;

    public JobTrackerController(JobTrackerService jobTrackerService) {
        this.jobTrackerService = jobTrackerService;
    }

    @GetMapping("/applications")
    public ResponseEntity<List<JobApplicationDTO>> getApplications() {
        return ResponseEntity.ok(jobTrackerService.getUserApplications("usr_1001"));
    }

    @PostMapping("/applications")
    public ResponseEntity<JobApplicationDTO> createApplication(@RequestBody JobApplicationDTO request) {
        return ResponseEntity.ok(jobTrackerService.createApplication(request));
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<JobApplicationDTO> updateStatus(
            @PathVariable String id,
            @RequestParam("status") String status) {
        JobApplicationDTO updated = jobTrackerService.updateStatus(id, status);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Map<String, String>> deleteApplication(@PathVariable String id) {
        boolean deleted = jobTrackerService.deleteApplication(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Application deleted successfully."));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(jobTrackerService.getApplicationStats("usr_1001"));
    }
}
