package com.careeros.controller;

import com.careeros.domain.dto.*;
import com.careeros.service.admin.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class AdminController {

    private final DashboardAnalyticsService dashboardAnalyticsService;
    private final UserManagementService userManagementService;
    private final RevenueAnalyticsService revenueAnalyticsService;
    private final AdminService adminService;

    public AdminController(
            DashboardAnalyticsService dashboardAnalyticsService,
            UserManagementService userManagementService,
            RevenueAnalyticsService revenueAnalyticsService,
            AdminService adminService) {

        this.dashboardAnalyticsService = dashboardAnalyticsService;
        this.userManagementService = userManagementService;
        this.revenueAnalyticsService = revenueAnalyticsService;
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardMetricsResponse> getDashboardMetrics() {
        AdminDashboardMetricsResponse metrics = dashboardAnalyticsService.getMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserItem>> getUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "role", required = false) String role) {

        List<AdminUserItem> users = userManagementService.getUsers(page, size, search, role);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{id}/block")
    public ResponseEntity<Map<String, String>> blockUser(@PathVariable String id) {
        userManagementService.blockUser(id);
        return ResponseEntity.ok(Map.of("message", "User " + id + " blocked successfully."));
    }

    @PutMapping("/users/{id}/unblock")
    public ResponseEntity<Map<String, String>> unblockUser(@PathVariable String id) {
        userManagementService.unblockUser(id);
        return ResponseEntity.ok(Map.of("message", "User " + id + " unblocked successfully."));
    }

    @PutMapping("/users/{id}/change-plan")
    public ResponseEntity<Map<String, String>> changeUserPlan(
            @PathVariable String id,
            @RequestParam("planCode") String planCode) {

        userManagementService.changePlan(id, planCode);
        return ResponseEntity.ok(Map.of("message", "User " + id + " plan updated to " + planCode));
    }

    @GetMapping("/payments")
    public ResponseEntity<List<Map<String, Object>>> getPayments() {
        List<Map<String, Object>> payments = revenueAnalyticsService.getPaymentsHistory();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<List<Map<String, Object>>> getSubscriptions() {
        List<Map<String, Object>> subs = revenueAnalyticsService.getSubscriptionsList();
        return ResponseEntity.ok(subs);
    }

    @GetMapping("/system-health")
    public ResponseEntity<SystemHealthResponse> getSystemHealth() {
        SystemHealthResponse health = dashboardAnalyticsService.getSystemHealth();
        return ResponseEntity.ok(health);
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLogItem>> getAuditLogs() {
        List<AuditLogItem> logs = adminService.getAuditLogs();
        return ResponseEntity.ok(logs);
    }
}
