package com.careeros.service.resume;

import com.careeros.domain.dto.ResumeUpdateRequest;
import com.careeros.domain.dto.ResumeUploadResponse;
import com.careeros.domain.dto.StructuredResumeData;
import com.careeros.service.storage.FileValidationService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;

@Service
public class ResumeService {

    private final FileValidationService fileValidationService;
    private final ResumeParsingService resumeParsingService;

    public ResumeService(FileValidationService fileValidationService, ResumeParsingService resumeParsingService) {
        this.fileValidationService = fileValidationService;
        this.resumeParsingService = resumeParsingService;
    }

    public ResumeUploadResponse processAndSaveResumeUpload(String userId, MultipartFile file, String targetJobTitle) throws IOException {
        // 1. File Security & Validation
        String format = fileValidationService.validateAndDetectFileType(file);
        String cleanFileName = fileValidationService.sanitizeFilename(file.getOriginalFilename());
        String fileHash = fileValidationService.computeSha256Hash(file);

        // 2. Parse Text into Structured Resume Schema
        String mockRawText = "Extracted document content for candidate " + cleanFileName;
        StructuredResumeData structuredData = resumeParsingService.parseExtractedText(cleanFileName, mockRawText);

        // 3. Create Version 1 Record
        String resumeId = "res_" + System.currentTimeMillis();

        return new ResumeUploadResponse(
            resumeId,
            cleanFileName.replaceAll("(?i)\\.(pdf|docx)$", ""),
            targetJobTitle != null && !targetJobTitle.isBlank() ? targetJobTitle : "Senior Software Engineer",
            1,
            fileHash,
            format,
            file.getSize(),
            false,
            structuredData,
            Instant.now()
        );
    }

    public ResumeUploadResponse updateResumeVersion(String userId, String resumeId, ResumeUpdateRequest request) {
        return new ResumeUploadResponse(
            resumeId,
            request.title(),
            request.targetJobTitle() != null ? request.targetJobTitle() : "Senior Software Engineer",
            2, // Version incremented
            "hash_updated_" + System.currentTimeMillis(),
            "JSON",
            1024L,
            false,
            request.structuredData(),
            Instant.now()
        );
    }

    public StructuredResumeData restorePreviousVersion(String userId, String resumeId, int targetVersionNumber) {
        // Restore version mock implementation returning baseline structured data
        return resumeParsingService.parseExtractedText("Restored_v" + targetVersionNumber + ".pdf", "Restored raw content");
    }
}
