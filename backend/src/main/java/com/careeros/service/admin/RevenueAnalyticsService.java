package com.careeros.service.admin;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class RevenueAnalyticsService {

    public List<Map<String, Object>> getPaymentsHistory() {
        return List.of(
            Map.of("id", "pay_1001", "userId", "usr_1002", "amountInr", 49, "provider", "RAZORPAY", "status", "SUCCESS", "invoiceId", "INV-2026-98124", "createdAt", Instant.now().minusSeconds(864000).toString()),
            Map.of("id", "pay_1002", "userId", "usr_1004", "amountInr", 199, "provider", "CASHFREE", "status", "SUCCESS", "invoiceId", "INV-2026-98125", "createdAt", Instant.now().minusSeconds(1728000).toString())
        );
    }

    public List<Map<String, Object>> getSubscriptionsList() {
        return List.of(
            Map.of("id", "sub_1001", "userId", "usr_1002", "planCode", "PLAN_PREMIUM_MONTHLY", "priceInr", 49, "status", "ACTIVE", "provider", "RAZORPAY", "currentPeriodEnd", Instant.now().plusSeconds(1728000).toString()),
            Map.of("id", "sub_1002", "userId", "usr_1004", "planCode", "PLAN_CAREER_PRO", "priceInr", 199, "status", "ACTIVE", "provider", "CASHFREE", "currentPeriodEnd", Instant.now().plusSeconds(864000).toString())
        );
    }
}
