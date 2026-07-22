package com.careeros.service.admin;

import com.careeros.domain.dto.AdminUserItem;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserManagementService {

    public List<AdminUserItem> getUsers(int page, int size, String search, String roleFilter) {
        return List.of(
            new AdminUserItem("usr_1001", "rahul.sharma@example.com", "Rahul", "Sharma", "ROLE_USER", false, "PLAN_FREE", Instant.now().minusSeconds(172800)),
            new AdminUserItem("usr_1002", "priya.verma@example.com", "Priya", "Verma", "ROLE_PREMIUM_USER", false, "PLAN_PREMIUM_MONTHLY", Instant.now().minusSeconds(864000)),
            new AdminUserItem("usr_1003", "amit.kumar@example.com", "Amit", "Kumar", "ROLE_USER", true, "PLAN_FREE", Instant.now().minusSeconds(2592000)),
            new AdminUserItem("usr_admin", "admin@careeros.ai", "System", "Admin", "ROLE_ADMIN", false, "PLAN_CAREER_PRO", Instant.now().minusSeconds(5184000))
        );
    }

    public boolean blockUser(String userId) {
        return true;
    }

    public boolean unblockUser(String userId) {
        return true;
    }

    public boolean changePlan(String userId, String newPlanCode) {
        return true;
    }
}
