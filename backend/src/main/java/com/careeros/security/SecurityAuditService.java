package com.careeros.security;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class SecurityAuditService {

    public void logSecurityEvent(String email, String eventType, String ipAddress, String details) {
        // Log security audit events cleanly
        System.out.printf("[SECURITY AUDIT] %s | User: %s | Event: %s | IP: %s | Details: %s%n",
                Instant.now(), email, eventType, ipAddress, details);
    }
}
