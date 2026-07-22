package com.careeros.security;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RateLimitService {

    private final Map<String, AtomicInteger> rateLimitCounters = new ConcurrentHashMap<>();

    public boolean allowRequest(String clientIp, String endpoint, int maxAllowed) {
        String key = clientIp + ":" + endpoint;
        rateLimitCounters.putIfAbsent(key, new AtomicInteger(0));
        int current = rateLimitCounters.get(key).incrementAndGet();

        return current <= maxAllowed;
    }

    public void resetCounter(String clientIp, String endpoint) {
        String key = clientIp + ":" + endpoint;
        rateLimitCounters.remove(key);
    }
}
