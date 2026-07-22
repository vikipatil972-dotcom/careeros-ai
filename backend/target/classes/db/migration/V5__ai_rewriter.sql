-- Flyway Migration V5__ai_rewriter.sql

-- 1. AI Rewrites Table for Audit Logging & History
CREATE TABLE IF NOT EXISTS ai_rewrites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    section_name VARCHAR(50) NOT NULL, -- 'SUMMARY', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'BULLET'
    style_preset VARCHAR(50) NOT NULL, -- 'ATS_OPTIMIZED', 'PROFESSIONAL', 'TECHNICAL', 'LEADERSHIP'
    original_content TEXT NOT NULL,
    rewritten_content TEXT NOT NULL,
    score_before INT DEFAULT 0,
    score_after INT DEFAULT 0,
    score_delta INT DEFAULT 0,
    provider_name VARCHAR(50) DEFAULT 'GEMINI_PRO',
    is_applied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_ai_rewrites_user_resume ON ai_rewrites(user_id, resume_id);

-- 2. Resume Quality Reports Table
CREATE TABLE IF NOT EXISTS resume_quality_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    readability_score INT NOT NULL,
    tone_score INT NOT NULL,
    grammar_suggestions JSONB,
    strong_sections JSONB,
    weak_sections JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_quality_reports_resume ON resume_quality_reports(resume_id);
