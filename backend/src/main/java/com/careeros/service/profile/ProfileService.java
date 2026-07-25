package com.careeros.service.profile;

import com.careeros.domain.dto.UserNotificationDTO;
import com.careeros.domain.dto.UserProfileDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ProfileService {

    private UserProfileDTO defaultProfile = new UserProfileDTO(
        "prof_1001",
        "usr_1001",
        "Vivek",
        "Patil",
        "vikipatil972@gmail.com",
        "Senior Full Stack & AI Systems Engineer",
        "Passionate engineer specializing in high-concurrency Spring Boot microservices, React 18, PostgreSQL, and LLM AI systems.",
        "https://www.linkedin.com/in/vivek-patil-393501326",
        "https://github.com/vikipatil972-dotcom",
        "https://careeros-ai.vercel.app",
        "+91 98765 43210",
        "Bengaluru, India",
        3500000L,
        List.of("Senior Full Stack Engineer", "DevOps Architect", "Backend Lead")
    );

    private final List<UserNotificationDTO> notifications = Collections.synchronizedList(new ArrayList<>(List.of(
        new UserNotificationDTO("notif_1", "usr_1001", "ATS Report Generated", "Your resume score for Google Senior Engineer job description reached 92/100.", "ATS_ALERT", false, Instant.now().minusSeconds(3600)),
        new UserNotificationDTO("notif_2", "usr_1001", "Mock Interview Scheduled", "STAR Mock Interview for System Design is ready.", "INTERVIEW_REMINDER", false, Instant.now().minusSeconds(86400)),
        new UserNotificationDTO("notif_3", "usr_1001", "Premium Pass Active", "Your ₹49/month subscription is active until August 22, 2026.", "BILLING", true, Instant.now().minusSeconds(172800))
    )));

    public UserProfileDTO getProfile(String userId) {
        return defaultProfile;
    }

    public UserProfileDTO updateProfile(UserProfileDTO request) {
        defaultProfile = new UserProfileDTO(
            defaultProfile.id(),
            defaultProfile.userId(),
            request.firstName() != null ? request.firstName() : defaultProfile.firstName(),
            request.lastName() != null ? request.lastName() : defaultProfile.lastName(),
            defaultProfile.email(),
            request.headline() != null ? request.headline() : defaultProfile.headline(),
            request.bio() != null ? request.bio() : defaultProfile.bio(),
            request.linkedinUrl() != null ? request.linkedinUrl() : defaultProfile.linkedinUrl(),
            request.githubUrl() != null ? request.githubUrl() : defaultProfile.githubUrl(),
            request.portfolioUrl() != null ? request.portfolioUrl() : defaultProfile.portfolioUrl(),
            request.phone() != null ? request.phone() : defaultProfile.phone(),
            request.location() != null ? request.location() : defaultProfile.location(),
            request.targetSalaryInr() > 0 ? request.targetSalaryInr() : defaultProfile.targetSalaryInr(),
            request.preferredRoles() != null ? request.preferredRoles() : defaultProfile.preferredRoles()
        );
        return defaultProfile;
    }

    public List<UserNotificationDTO> getNotifications(String userId) {
        return notifications;
    }

    public boolean markNotificationRead(String id) {
        for (int i = 0; i < notifications.size(); i++) {
            UserNotificationDTO n = notifications.get(i);
            if (n.id().equalsIgnoreCase(id)) {
                notifications.set(i, new UserNotificationDTO(n.id(), n.userId(), n.title(), n.message(), n.category(), true, n.createdAt()));
                return true;
            }
        }
        return false;
    }
}
