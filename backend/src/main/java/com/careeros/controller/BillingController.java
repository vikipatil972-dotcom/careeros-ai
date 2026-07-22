package com.careeros.controller;

import com.careeros.domain.dto.*;
import com.careeros.service.billing.BillingService;
import com.careeros.service.billing.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/billing")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class BillingController {

    private final BillingService billingService;
    private final InvoiceService invoiceService;

    public BillingController(BillingService billingService, InvoiceService invoiceService) {
        this.billingService = billingService;
        this.invoiceService = invoiceService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<CreateOrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        CreateOrderResponse order = billingService.createOrder(request);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/webhook")
    public ResponseEntity<Map<String, String>> handleWebhook(
            @RequestHeader("X-Razorpay-Signature") String signature,
            @RequestBody String rawPayload) {

        boolean isValid = billingService.processWebhook(rawPayload, signature, "whsec_secret_123");
        if (isValid) {
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Webhook verified and subscription activated."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "FAILED", "message", "Invalid HMAC signature."));
        }
    }

    @GetMapping("/subscription")
    public ResponseEntity<Map<String, Object>> getSubscription() {
        return ResponseEntity.ok(Map.of(
            "planCode", "PLAN_PREMIUM_MONTHLY",
            "planName", "Premium Pass",
            "priceInr", 49,
            "status", "ACTIVE",
            "provider", "RAZORPAY",
            "currentPeriodEnd", Instant.now().plusSeconds(2592000).toString(),
            "cancelAtPeriodEnd", false
        ));
    }

    @PostMapping("/upgrade")
    public ResponseEntity<Map<String, String>> upgradeSubscription(@Valid @RequestBody CreateOrderRequest request) {
        return ResponseEntity.ok(Map.of("message", "Subscription successfully upgraded to " + request.planCode()));
    }

    @PostMapping("/cancel")
    public ResponseEntity<Map<String, String>> cancelSubscription() {
        return ResponseEntity.ok(Map.of("message", "Subscription cancelled. Access remains active until period end."));
    }

    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getPaymentHistory() {
        List<Map<String, Object>> history = List.of(
            Map.of(
                "id", "pay_1001",
                "amountInr", 49,
                "provider", "RAZORPAY",
                "status", "SUCCESS",
                "invoiceId", "INV-2026-98124",
                "createdAt", Instant.now().minusSeconds(864000).toString()
            )
        );
        return ResponseEntity.ok(history);
    }

    @GetMapping("/invoices")
    public ResponseEntity<List<Map<String, Object>>> getInvoices() {
        List<Map<String, Object>> invoices = List.of(
            Map.of(
                "id", "inv_1001",
                "invoiceNumber", "INV-2026-98124",
                "amountInr", 49,
                "taxInr", 9,
                "createdAt", Instant.now().minusSeconds(864000).toString()
            )
        );
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/invoices/{id}/download")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable String id) {
        byte[] pdfBytes = invoiceService.generatePdfInvoice(id, "Rahul Sharma", "Premium Pass", 49);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("Invoice_" + id + ".pdf").build());

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }

    @PostMapping("/apply-coupon")
    public ResponseEntity<Map<String, Object>> applyCoupon(@Valid @RequestBody CouponRedeemRequest request) {
        if ("PROMO50".equalsIgnoreCase(request.couponCode())) {
            return ResponseEntity.ok(Map.of("valid", true, "discountPercent", 50, "message", "50% Discount Applied!"));
        }
        return ResponseEntity.badRequest().body(Map.of("valid", false, "message", "Invalid or expired coupon code."));
    }

    @GetMapping("/referral")
    public ResponseEntity<ReferralCodeResponse> getReferral() {
        ReferralCodeResponse response = billingService.getReferralCode("usr_1001");
        return ResponseEntity.ok(response);
    }
}
