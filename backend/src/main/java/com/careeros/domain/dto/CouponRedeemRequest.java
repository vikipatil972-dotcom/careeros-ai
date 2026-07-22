package com.careeros.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record CouponRedeemRequest(
    @NotBlank(message = "Coupon code is required")
    String couponCode
) {}
