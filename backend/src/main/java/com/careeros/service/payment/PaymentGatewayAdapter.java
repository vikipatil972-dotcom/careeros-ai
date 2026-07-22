package com.careeros.service.payment;

import java.math.BigDecimal;
import java.util.Map;

public interface PaymentGatewayAdapter {

    String getProviderName();

    CheckoutOrderResponse createCheckoutOrder(String userId, String planCode, BigDecimal amountInr);

    boolean verifyWebhookSignature(String rawPayload, String signatureHeader);

    PaymentVerificationResult processPaymentCallback(Map<String, String> payload);

    record CheckoutOrderResponse(
        String providerOrderId,
        String checkoutUrl,
        BigDecimal amount,
        String currency
    ) {}

    record PaymentVerificationResult(
        boolean success,
        String providerPaymentId,
        String providerOrderId,
        BigDecimal amountPaid,
        String rawResponse
    ) {}
}
