-- Flyway Migration V8__career_roadmap.sql

-- 1. Career Goals Table
CREATE TABLE IF NOT EXISTS career_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dream_company VARCHAR(150) NOT NULL,
    dream_role VARCHAR(150) NOT NULL,
    target_salary_inr BIGINT DEFAULT 0,
    target_timeline_months INT DEFAULT 6,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_career_goals_user ON career_goals(user_id);

-- 2. Career Skill Gaps Table
CREATE TABLE IF NOT EXISTS career_skill_gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    missing_skills JSONB NOT NULL,
    missing_tools JSONB NOT NULL,
    missing_soft_skills JSONB NOT NULL,
    missing_certifications JSONB NOT NULL,
    missing_projects JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Career Roadmaps Table
CREATE TABLE IF NOT EXISTS career_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestones_json JSONB NOT NULL,
    readiness_score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Learning Resources Table
CREATE TABLE IF NOT EXISTS learning_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50) NOT NULL, -- 'YOUTUBE', 'DOCUMENTATION', 'PRACTICE_PLATFORM', 'BOOK', 'GITHUB'
    url VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL -- 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'
);

-- 5. Weekly Progress Table
CREATE TABLE IF NOT EXISTS weekly_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    streak_days INT NOT NULL DEFAULT 1,
    skills_completed INT NOT NULL DEFAULT 0,
    projects_completed INT NOT NULL DEFAULT 0,
    progress_percent INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
