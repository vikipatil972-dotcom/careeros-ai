package com.careeros.domain.dto;

public record ReferralCodeResponse(
    String referralCode,
    int totalReferrals,
    int rewardPoints
) {}
