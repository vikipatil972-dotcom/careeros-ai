package com.careeros.service.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HexFormat;

@Service
public class FileValidationService {

    public static final long MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB Limit

    private static final byte[] PDF_MAGIC_BYTES = new byte[]{0x25, 0x50, 0x44, 0x46, 0x2D}; // %PDF-
    private static final byte[] ZIP_DOCX_MAGIC_BYTES = new byte[]{0x50, 0x4B, 0x03, 0x04}; // PK\x03\x04

    public String sanitizeFilename(String filename) {
        if (filename == null || filename.isBlank()) {
            return "resume_upload";
        }
        // Strip path traversal attempts
        String cleanName = filename.replaceAll("^[./\\\\]+", "").replaceAll("[\\\\/:]", "_");
        return cleanName.length() > 255 ? cleanName.substring(0, 255) : cleanName;
    }

    public void validateFileSize(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty.");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds 10 MB limit. Uploaded: " + (file.getSize() / (1024 * 1024)) + " MB");
        }
    }

    public String validateAndDetectFileType(MultipartFile file) throws IOException {
        validateFileSize(file);

        try (InputStream inputStream = file.getInputStream()) {
            byte[] header = new byte[8];
            int bytesRead = inputStream.read(header, 0, header.length);
            if (bytesRead < 4) {
                throw new IllegalArgumentException("Invalid file format: Header too short.");
            }

            if (isPdfMagicBytes(header)) {
                return "PDF";
            } else if (isDocxMagicBytes(header)) {
                return "DOCX";
            } else {
                throw new IllegalArgumentException("Security Rejection: Invalid magic bytes. Only genuine PDF and DOCX files are allowed.");
            }
        }
    }

    public String computeSha256Hash(MultipartFile file) throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            try (InputStream is = file.getInputStream()) {
                byte[] buffer = new byte[8192];
                int read;
                while ((read = is.read(buffer)) != -1) {
                    digest.update(buffer, 0, read);
                }
            }
            return HexFormat.of().formatHex(digest.digest());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 Algorithm missing", e);
        }
    }

    private boolean isPdfMagicBytes(byte[] header) {
        return header.length >= 5 &&
               header[0] == PDF_MAGIC_BYTES[0] &&
               header[1] == PDF_MAGIC_BYTES[1] &&
               header[2] == PDF_MAGIC_BYTES[2] &&
               header[3] == PDF_MAGIC_BYTES[3] &&
               header[4] == PDF_MAGIC_BYTES[4];
    }

    private boolean isDocxMagicBytes(byte[] header) {
        return header.length >= 4 &&
               header[0] == ZIP_DOCX_MAGIC_BYTES[0] &&
               header[1] == ZIP_DOCX_MAGIC_BYTES[1] &&
               header[2] == ZIP_DOCX_MAGIC_BYTES[2] &&
               header[3] == ZIP_DOCX_MAGIC_BYTES[3];
    }
}
