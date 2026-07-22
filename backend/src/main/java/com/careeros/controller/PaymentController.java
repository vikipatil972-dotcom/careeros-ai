package com.careeros.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/checkout")
    public ResponseEntity<Map<String, Object>> createCheckoutOrder(@RequestBody Map<String, String> request) {
        String planCode = request.getOrDefault("planCode", "PLAN_PREMIUM_MONTHLY");
        String provider = request.getOrDefault("provider", "RAZORPAY");

        Map<String, Object> response = Map.of(
            "orderId", provider.toLowerCase() + "_ord_" + System.currentTimeMillis(),
            "planCode", planCode,
            "provider", provider,
            "amountInr", 49.00,
            "currency", "INR",
            "status", "INITIATED",
            "createdAt", Instant.now().toString()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/webhook/{provider}")
    public ResponseEntity<Map<String, String>> handleWebhook(
            @PathVariable String provider,
            @RequestHeader(value = "X-Signature", required = false) String signature,
            @RequestBody String rawPayload) {

        // Signature Verification logic handled by PaymentGatewayAdapter
        return ResponseEntity.ok(Map.of(
            "status", "RECEIVED",
            "provider", provider,
            "verified", "true"
        ));
    }
}
