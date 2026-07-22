package com.careeros.service.billing;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class InvoiceService {

    public byte[] generatePdfInvoice(String invoiceId, String userName, String planName, int amountInr) {
        String invoiceText = "%PDF-1.4 Invoice #" + invoiceId + "\n" +
                             "Customer: " + userName + "\n" +
                             "Plan: " + planName + "\n" +
                             "Amount: INR " + amountInr + "\n" +
                             "GST (18%): INR " + Math.round(amountInr * 0.18) + "\n" +
                             "Date: " + Instant.now().toString() + "\n" +
                             "Status: PAID";

        return invoiceText.getBytes();
    }
}
