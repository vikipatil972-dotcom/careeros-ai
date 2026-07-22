package com.careeros.controller;

import com.careeros.domain.dto.ResumeUpdateRequest;
import com.careeros.domain.dto.ResumeUploadResponse;
import com.careeros.domain.dto.StructuredResumeData;
import com.careeros.service.resume.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/resumes")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeUploadResponse> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "targetJobTitle", required = false) String targetJobTitle) throws IOException {

        ResumeUploadResponse response = resumeService.processAndSaveResumeUpload("usr_1001", file, targetJobTitle);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> listResumes() {
        Map<String, Object> r1 = Map.of(
            "id", "res_1001",
            "title", "SDE_Java_Backend_v2",
            "targetJobTitle", "Full Stack Developer",
            "versionNumber", 2,
            "isPrimary", true,
            "createdAt", Instant.now().minusSeconds(7200).toString(),
            "updatedAt", Instant.now().minusSeconds(1800).toString()
        );

        Map<String, Object> r2 = Map.of(
            "id", "res_1002",
            "title", "FullStack_React_Node_v1",
            "targetJobTitle", "Frontend Engineer",
            "versionNumber", 1,
            "isPrimary", false,
            "createdAt", Instant.now().minusSeconds(172800).toString(),
            "updatedAt", Instant.now().minusSeconds(172800).toString()
        );

        return ResponseEntity.ok(List.of(r1, r2));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeUploadResponse> getResumeDetails(@PathVariable String id) {
        StructuredResumeData data = resumeService.restorePreviousVersion("usr_1001", id, 1);
        ResumeUploadResponse response = new ResumeUploadResponse(
            id,
            "SDE_Java_Backend_v2",
            "Full Stack Developer",
            2,
            "hash_abc123789",
            "PDF",
            245800L,
            false,
            data,
            Instant.now()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeUploadResponse> updateResume(
            @PathVariable String id,
            @Valid @RequestBody ResumeUpdateRequest request) {

        ResumeUploadResponse updated = resumeService.updateResumeVersion("usr_1001", id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteResume(@PathVariable String id) {
        return ResponseEntity.ok(Map.of("message", "Resume " + id + " and all associated versions were successfully deleted."));
    }

    @GetMapping("/{id}/versions")
    public ResponseEntity<List<Map<String, Object>>> getVersionHistory(@PathVariable String id) {
        List<Map<String, Object>> versions = List.of(
            Map.of("versionNumber", 2, "fileHash", "hash_ver2", "fileFormat", "JSON", "createdAt", Instant.now().minusSeconds(1800).toString(), "isCurrent", true),
            Map.of("versionNumber", 1, "fileHash", "hash_ver1", "fileFormat", "PDF", "createdAt", Instant.now().minusSeconds(7200).toString(), "isCurrent", false)
        );
        return ResponseEntity.ok(versions);
    }

    @PostMapping("/{id}/restore/{versionNumber}")
    public ResponseEntity<StructuredResumeData> restoreVersion(
            @PathVariable String id,
            @PathVariable int versionNumber) {

        StructuredResumeData restored = resumeService.restorePreviousVersion("usr_1001", id, versionNumber);
        return ResponseEntity.ok(restored);
    }

    @GetMapping("/{id}/export-pdf")
    public ResponseEntity<byte[]> exportPdf(@PathVariable String id) {
        byte[] pdfContent = "%PDF-1.4 Mock Rendered ATS Resume Output".getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("CareerOS_Resume_" + id + ".pdf").build());

        return ResponseEntity.ok().headers(headers).body(pdfContent);
    }
}
