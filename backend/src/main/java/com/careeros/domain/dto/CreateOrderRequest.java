package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateOrderRequest(
    @NotBlank(message = "Plan code is required")
    String planCode, // 'PLAN_PREMIUM_MONTHLY', 'PLAN_CAREER_PRO'

    @NotBlank(message = "Payment provider is required")
    String provider, // 'RAZORPAY', 'CASHFREE', 'PHONEPE', 'STRIPE'

    String couponCode
) {}
