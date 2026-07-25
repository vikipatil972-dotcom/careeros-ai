-- Flyway Migration V12__job_tracker_profile.sql

-- 1. Job Applications & Offer Tracker Table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(150) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED', -- 'WISHLIST', 'APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED'
    salary_offered_inr BIGINT DEFAULT 0,
    location VARCHAR(100) DEFAULT 'Remote',
    job_url VARCHAR(500),
    notes TEXT,
    applied_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_job_applications_user ON job_applications(user_id, status);

-- 2. Extended User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    headline VARCHAR(255) DEFAULT 'Software Engineer | CareerOS AI Member',
    bio TEXT DEFAULT 'Passionate software engineer building resilient enterprise platforms.',
    linkedin_url VARCHAR(500) DEFAULT 'https://www.linkedin.com/in/vivek-patil-393501326',
    github_url VARCHAR(500) DEFAULT 'https://github.com/vikipatil972-dotcom',
    portfolio_url VARCHAR(500) DEFAULT 'https://careeros-ai.vercel.app',
    phone VARCHAR(50) DEFAULT '+91 98765 43210',
    location VARCHAR(100) DEFAULT 'Bengaluru, India',
    target_salary_inr BIGINT DEFAULT 3500000,
    preferred_roles JSONB DEFAULT '["Senior Full Stack Engineer", "DevOps Architect", "Backend Lead"]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. System Notifications Table
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'SYSTEM', -- 'SYSTEM', 'ATS_ALERT', 'INTERVIEW_REMINDER', 'BILLING'
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_notifications_read ON user_notifications(user_id, is_read);
