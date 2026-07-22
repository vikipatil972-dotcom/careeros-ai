package com.careeros.security;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RefreshTokenService {

    private final Map<String, String> refreshTokenStore = new ConcurrentHashMap<>();

    public String createRefreshToken(String email) {
        String refreshToken = UUID.randomUUID().toString();
        refreshTokenStore.put(refreshToken, email);
        return refreshToken;
    }

    public String validateAndRotateRefreshToken(String refreshToken) {
        String email = refreshTokenStore.remove(refreshToken);
        if (email != null) {
            return createRefreshToken(email);
        }
        return null;
    }

    public void revokeAllUserTokens(String email) {
        refreshTokenStore.entrySet().removeIf(entry -> entry.getValue().equalsIgnoreCase(email));
    }
}
