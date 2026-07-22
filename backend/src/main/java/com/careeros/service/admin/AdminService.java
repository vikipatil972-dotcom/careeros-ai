package com.careeros.service.admin;

import com.careeros.domain.dto.AuditLogItem;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AdminService {

    public List<AuditLogItem> getAuditLogs() {
        return List.of(
            new AuditLogItem("log_1001", "usr_admin", "BLOCK_USER", "usr_1003", "Blocked user account due to suspicious API rate activity", "192.168.1.10", Instant.now().minusSeconds(3600)),
            new AuditLogItem("log_1002", "usr_admin", "CHANGE_PLAN", "usr_1002", "Upgraded plan to PLAN_PREMIUM_MONTHLY", "192.168.1.10", Instant.now().minusSeconds(7200)),
            new AuditLogItem("log_1003", "usr_admin", "PRICE_CHANGE", "PLAN_PREMIUM_MONTHLY", "Updated price to 49 INR", "192.168.1.10", Instant.now().minusSeconds(86400))
        );
    }
}
