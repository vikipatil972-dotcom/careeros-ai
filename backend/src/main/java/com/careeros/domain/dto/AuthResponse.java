package com.careeros.domain.dto;

public record AuthResponse(
    String id,
    String email,
    String fullName,
    String role,
    boolean isEmailVerified,
    String accessToken,
    String refreshToken,
    long expiresInMs,
    String message
) {}
