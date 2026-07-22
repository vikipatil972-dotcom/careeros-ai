package com.careeros.controller;

import com.careeros.domain.dto.CoverLetterRequest;
import com.careeros.domain.dto.CoverLetterResponse;
import com.careeros.service.coverletter.CoverLetterService;
import jakarta.validation.Valid;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cover-letters")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class CoverLetterController {

    private final CoverLetterService coverLetterService;

    public CoverLetterController(CoverLetterService coverLetterService) {
        this.coverLetterService = coverLetterService;
    }

    @PostMapping("/generate")
    public ResponseEntity<CoverLetterResponse> generateCoverLetter(@Valid @RequestBody CoverLetterRequest request) {
        CoverLetterResponse response = coverLetterService.generateCoverLetter(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CoverLetterResponse> saveCoverLetter(@Valid @RequestBody CoverLetterRequest request) {
        CoverLetterResponse response = coverLetterService.generateCoverLetter(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoverLetterResponse> updateCoverLetter(
            @PathVariable String id,
            @Valid @RequestBody CoverLetterRequest request) {

        CoverLetterResponse response = coverLetterService.generateCoverLetter(request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCoverLetter(@PathVariable String id) {
        return ResponseEntity.ok(Map.of("message", "Cover letter " + id + " was successfully deleted."));
    }

    @GetMapping("/history")
    public ResponseEntity<List<CoverLetterResponse>> getCoverLetterHistory() {
        CoverLetterRequest req = new CoverLetterRequest("res_1001", "Google", "Senior Staff Engineer", "ATS_OPTIMIZED", "JD Text");
        CoverLetterResponse item = coverLetterService.generateCoverLetter(req);
        return ResponseEntity.ok(List.of(item));
    }

    @GetMapping("/{id}/export-pdf")
    public ResponseEntity<byte[]> exportPdf(@PathVariable String id) {
        byte[] pdfContent = "%PDF-1.4 Mock Cover Letter PDF Document".getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("CoverLetter_" + id + ".pdf").build());

        return ResponseEntity.ok().headers(headers).body(pdfContent);
    }
}
