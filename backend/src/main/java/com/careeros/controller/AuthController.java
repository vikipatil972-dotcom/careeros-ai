package com.careeros.controller;

import com.careeros.domain.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (!request.password().equals(request.confirmPassword())) {
            throw new IllegalArgumentException("Password and confirm password do not match");
        }

        // Simulate successful registration & verification code dispatch
        AuthResponse response = new AuthResponse(
            "usr_" + System.currentTimeMillis(),
            request.email(),
            request.fullName(),
            "ROLE_USER",
            false,
            "jwt_access_token_mock_" + System.currentTimeMillis(),
            "jwt_refresh_token_mock_" + System.currentTimeMillis(),
            900000L,
            "Registration successful! Please verify your email with the 6-digit OTP sent to your inbox."
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Map<String, Object>> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        if (!"123456".equals(request.otpCode())) {
            throw new IllegalArgumentException("Invalid or expired 6-digit OTP verification code");
        }

        Map<String, Object> response = Map.of(
            "status", "SUCCESS",
            "isEmailVerified", true,
            "message", "Email address verified successfully! You can now access all features.",
            "timestamp", Instant.now().toString()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        String role = request.email().contains("admin") ? "ROLE_ADMIN" : "ROLE_USER";

        String accessToken = "jwt_access_token_" + System.currentTimeMillis();
        String refreshToken = "jwt_refresh_token_" + System.currentTimeMillis();

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/api/v1/auth")
                .maxAge(request.rememberMe() ? 7 * 24 * 3600 : 24 * 3600)
                .sameSite("Strict")
                .build();

        AuthResponse response = new AuthResponse(
            "usr_1001",
            request.email(),
            request.email().contains("admin") ? "System Admin" : "Rahul Sharma",
            role,
            true,
            accessToken,
            refreshToken,
            900000L,
            "Login successful!"
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue(name = "refreshToken", required = false) String refreshTokenCookie) {
        String newAccessToken = "jwt_access_token_refreshed_" + System.currentTimeMillis();

        AuthResponse response = new AuthResponse(
            "usr_1001",
            "rahul.sharma@example.com",
            "Rahul Sharma",
            "ROLE_USER",
            true,
            newAccessToken,
            refreshTokenCookie != null ? refreshTokenCookie : "jwt_refresh_token_renewed",
            900000L,
            "Access token refreshed successfully!"
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        ResponseCookie cleanCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/api/v1/auth")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                .body(Map.of("message", "Logged out successfully from session."));
    }

    @PostMapping("/logout-all")
    public ResponseEntity<Map<String, String>> logoutAll() {
        return ResponseEntity.ok(Map.of("message", "Revoked all active sessions across devices."));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(Map.of(
            "message", "A 6-digit password reset OTP has been sent to " + request.email(),
            "otpCodeDemo", "654321"
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        if (!"654321".equals(request.otpCode())) {
            throw new IllegalArgumentException("Invalid OTP code for password reset.");
        }

        return ResponseEntity.ok(Map.of("message", "Password reset successfully! Please login with your new password."));
    }
}
