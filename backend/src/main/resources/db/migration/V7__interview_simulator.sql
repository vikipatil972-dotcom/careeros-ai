-- Flyway Migration V7__interview_simulator.sql

-- 1. Interview Sessions Table
CREATE TABLE IF NOT EXISTS interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
    company_name VARCHAR(150) NOT NULL,
    job_role VARCHAR(150) NOT NULL,
    interview_type VARCHAR(50) NOT NULL, -- 'HR', 'TECHNICAL', 'BEHAVIORAL', 'SYSTEM_DESIGN', 'MANAGERIAL', 'MIXED'
    difficulty_level VARCHAR(50) NOT NULL, -- 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FAANG'
    total_questions INT NOT NULL DEFAULT 5,
    current_question_index INT NOT NULL DEFAULT 0,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    overall_score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_interview_sessions_user ON interview_sessions(user_id);

-- 2. Interview Questions Table
CREATE TABLE IF NOT EXISTS interview_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
    question_number INT NOT NULL,
    question_text TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    expected_structure TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_interview_questions_session ON interview_questions(session_id);

-- 3. Interview Answers Table
CREATE TABLE IF NOT EXISTS interview_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES interview_questions(id) ON DELETE CASCADE,
    user_answer_text TEXT NOT NULL,
    score INT NOT NULL,
    technical_score INT NOT NULL,
    communication_score INT NOT NULL,
    star_score INT NOT NULL,
    feedback_json JSONB NOT NULL,
    sample_answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_interview_answers_question ON interview_answers(question_id);

-- 4. Interview Reports Table
CREATE TABLE IF NOT EXISTS interview_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
    overall_score INT NOT NULL,
    skill_scores JSONB NOT NULL,
    weak_topics JSONB NOT NULL,
    strong_topics JSONB NOT NULL,
    roadmap JSONB NOT NULL,
    total_duration_seconds INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_interview_reports_session ON interview_reports(session_id);
