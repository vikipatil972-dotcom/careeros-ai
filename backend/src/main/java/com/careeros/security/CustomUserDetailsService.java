package com.careeros.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String role = email.contains("admin") ? "ROLE_ADMIN" : "ROLE_USER";
        return new User(
                email,
                "$2a$12$E2a18z9/hX6m9n1S0y4pEOy6QJvX0h0i8a5t6s7u8v9w0x1y2z3a4", // BCrypt encoded hash
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}
