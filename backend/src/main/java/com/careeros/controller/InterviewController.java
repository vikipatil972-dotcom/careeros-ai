package com.careeros.controller;

import com.careeros.domain.dto.*;
import com.careeros.service.interview.InterviewService;
import jakarta.validation.Valid;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/interviews")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping("/start")
    public ResponseEntity<InterviewSessionResponse> startInterview(@Valid @RequestBody StartInterviewRequest request) {
        InterviewSessionResponse response = interviewService.startSession(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{sessionId}/answer")
    public ResponseEntity<AnswerEvaluationResponse> submitAnswer(
            @PathVariable String sessionId,
            @Valid @RequestBody SubmitAnswerRequest request) {

        AnswerEvaluationResponse evaluation = interviewService.submitAnswer(request);
        return ResponseEntity.ok(evaluation);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<InterviewSessionResponse> getSession(@PathVariable String sessionId) {
        StartInterviewRequest dummyReq = new StartInterviewRequest("res_1001", "Google", "Senior Software Engineer", "MIXED", "FAANG", 3, "JD");
        InterviewSessionResponse response = interviewService.startSession(dummyReq);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<InterviewSessionResponse>> getHistory() {
        StartInterviewRequest dummyReq = new StartInterviewRequest("res_1001", "Google", "Senior Software Engineer", "MIXED", "FAANG", 3, "JD");
        InterviewSessionResponse session = interviewService.startSession(dummyReq);
        return ResponseEntity.ok(List.of(session));
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<Map<String, String>> deleteSession(@PathVariable String sessionId) {
        return ResponseEntity.ok(Map.of("message", "Interview session " + sessionId + " was successfully deleted."));
    }

    @GetMapping("/{sessionId}/report")
    public ResponseEntity<InterviewReportResponse> getReport(@PathVariable String sessionId) {
        InterviewReportResponse report = interviewService.getReport(sessionId);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/{sessionId}/export-pdf")
    public ResponseEntity<byte[]> exportPdf(@PathVariable String sessionId) {
        byte[] pdfContent = "%PDF-1.4 Mock Interview Report PDF Document".getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("InterviewReport_" + sessionId + ".pdf").build());

        return ResponseEntity.ok().headers(headers).body(pdfContent);
    }
}
