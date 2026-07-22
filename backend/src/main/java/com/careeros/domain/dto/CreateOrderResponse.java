package com.careeros.domain.dto;

public record CreateOrderResponse(
    String orderId,
    int amountInr,
    String currency,
    String provider,
    String gatewayKey,
    String signaturePayload
) {}
