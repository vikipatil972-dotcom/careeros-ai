package com.careeros.service.billing;

import com.careeros.domain.dto.*;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BillingService {

    private final WebhookVerificationService webhookVerificationService;

    public BillingService(WebhookVerificationService webhookVerificationService) {
        this.webhookVerificationService = webhookVerificationService;
    }

    public CreateOrderResponse createOrder(CreateOrderRequest request) {
        int amount = "PLAN_CAREER_PRO".equalsIgnoreCase(request.planCode()) ? 199 : 49;
        if (request.couponCode() != null && request.couponCode().equalsIgnoreCase("PROMO50")) {
            amount = (int) Math.round(amount * 0.5);
        }

        String orderId = "order_" + System.currentTimeMillis();
        String gatewayKey = "rzp_live_" + System.currentTimeMillis();
        String signaturePayload = "payload_sha256_" + System.currentTimeMillis();

        return new CreateOrderResponse(
            orderId,
            amount,
            "INR",
            request.provider(),
            gatewayKey,
            signaturePayload
        );
    }

    public boolean processWebhook(String rawPayload, String signature, String secret) {
        return webhookVerificationService.verifyHmacSha256(rawPayload, signature, secret);
    }

    public ReferralCodeResponse getReferralCode(String userId) {
        return new ReferralCodeResponse(
            "REF_" + userId.toUpperCase(),
            5,
            250
        );
    }
}
