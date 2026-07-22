package com.careeros.service.billing.gateway;

import com.careeros.domain.dto.CreateOrderResponse;

public interface PaymentGatewayAdapter {

    String getProviderName();

    CreateOrderResponse createOrder(String planCode, int amountInr, String currency);

    boolean verifyWebhookSignature(String rawBody, String signature, String secret);
}
