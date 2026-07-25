package com.careeros.controller;

import com.careeros.domain.dto.UserNotificationDTO;
import com.careeros.domain.dto.UserProfileDTO;
import com.careeros.service.profile.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<UserProfileDTO> getProfile() {
        return ResponseEntity.ok(profileService.getProfile("usr_1001"));
    }

    @PutMapping
    public ResponseEntity<UserProfileDTO> updateProfile(@RequestBody UserProfileDTO request) {
        return ResponseEntity.ok(profileService.updateProfile(request));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<UserNotificationDTO>> getNotifications() {
        return ResponseEntity.ok(profileService.getNotifications("usr_1001"));
    }

    @PutMapping("/notifications/{id}/read")
    public ResponseEntity<Map<String, String>> markNotificationRead(@PathVariable String id) {
        boolean success = profileService.markNotificationRead(id);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Notification marked as read."));
        }
        return ResponseEntity.notFound().build();
    }
}
