-- Flyway Migration V6__cover_letter.sql

-- 1. Cover Letters Table
CREATE TABLE IF NOT EXISTS cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
    company_name VARCHAR(150) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    style_preset VARCHAR(50) NOT NULL, -- 'PROFESSIONAL', 'ATS_OPTIMIZED', 'FORMAL', 'FRIENDLY', 'TECHNICAL', 'EXECUTIVE'
    full_content TEXT NOT NULL,
    greeting TEXT,
    opening_paragraph TEXT,
    value_prop_paragraph TEXT,
    skills_paragraph TEXT,
    closing_paragraph TEXT,
    signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_cover_letters_user ON cover_letters(user_id);

-- 2. Cover Letter Versions Table
CREATE TABLE IF NOT EXISTS cover_letter_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cover_letter_id UUID NOT NULL REFERENCES cover_letters(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_cover_letter_versions ON cover_letter_versions(cover_letter_id, version_number);
