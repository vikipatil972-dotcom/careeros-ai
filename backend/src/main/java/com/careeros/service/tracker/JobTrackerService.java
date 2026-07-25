package com.careeros.service.tracker;

import com.careeros.domain.dto.JobApplicationDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JobTrackerService {

    private final Map<String, JobApplicationDTO> store = new ConcurrentHashMap<>();

    public JobTrackerService() {
        // Seed initial applications for demo user
        JobApplicationDTO app1 = new JobApplicationDTO("job_101", "usr_1001", "Google", "Senior Full Stack Engineer", "INTERVIEWING", 3800000L, "Bengaluru, IN", "https://careers.google.com", "Passed Tech Round 1", LocalDate.now().minusDays(12), Instant.now());
        JobApplicationDTO app2 = new JobApplicationDTO("job_102", "usr_1001", "Stripe", "Backend Systems Engineer", "OFFER", 4500000L, "Remote", "https://stripe.com/jobs", "Offer Received - Negotiating", LocalDate.now().minusDays(20), Instant.now());
        JobApplicationDTO app3 = new JobApplicationDTO("job_103", "usr_1001", "Amazon", "Software Development Engineer II", "APPLIED", 3200000L, "Hyderabad, IN", "https://amazon.jobs", "Applied via referral", LocalDate.now().minusDays(5), Instant.now());
        JobApplicationDTO app4 = new JobApplicationDTO("job_104", "usr_1001", "Microsoft", "Senior Cloud Engineer", "WISHLIST", 3600000L, "Bengaluru, IN", "https://careers.microsoft.com", "Preparing custom resume", LocalDate.now().minusDays(2), Instant.now());

        store.put(app1.id(), app1);
        store.put(app2.id(), app2);
        store.put(app3.id(), app3);
        store.put(app4.id(), app4);
    }

    public List<JobApplicationDTO> getUserApplications(String userId) {
        return new ArrayList<>(store.values());
    }

    public JobApplicationDTO createApplication(JobApplicationDTO request) {
        String id = "job_" + System.currentTimeMillis();
        JobApplicationDTO app = new JobApplicationDTO(
            id,
            request.userId() != null ? request.userId() : "usr_1001",
            request.companyName(),
            request.jobTitle(),
            request.status() != null ? request.status() : "APPLIED",
            request.salaryOfferedInr(),
            request.location() != null ? request.location() : "Remote",
            request.jobUrl(),
            request.notes(),
            request.appliedDate() != null ? request.appliedDate() : LocalDate.now(),
            Instant.now()
        );
        store.put(id, app);
        return app;
    }

    public JobApplicationDTO updateStatus(String id, String status) {
        JobApplicationDTO existing = store.get(id);
        if (existing != null) {
            JobApplicationDTO updated = new JobApplicationDTO(
                existing.id(),
                existing.userId(),
                existing.companyName(),
                existing.jobTitle(),
                status,
                existing.salaryOfferedInr(),
                existing.location(),
                existing.jobUrl(),
                existing.notes(),
                existing.appliedDate(),
                existing.createdAt()
            );
            store.put(id, updated);
            return updated;
        }
        return null;
    }

    public boolean deleteApplication(String id) {
        return store.remove(id) != null;
    }

    public Map<String, Long> getApplicationStats(String userId) {
        long applied = store.values().stream().filter(a -> "APPLIED".equalsIgnoreCase(a.status())).count();
        long interviewing = store.values().stream().filter(a -> "INTERVIEWING".equalsIgnoreCase(a.status())).count();
        long offers = store.values().stream().filter(a -> "OFFER".equalsIgnoreCase(a.status())).count();
        long wishlist = store.values().stream().filter(a -> "WISHLIST".equalsIgnoreCase(a.status())).count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("total", (long) store.size());
        stats.put("applied", applied);
        stats.put("interviewing", interviewing);
        stats.put("offers", offers);
        stats.put("wishlist", wishlist);
        return stats;
    }
}
