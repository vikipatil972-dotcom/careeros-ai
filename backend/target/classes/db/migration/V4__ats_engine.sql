-- Flyway Migration V4__ats_engine.sql

-- Extend ats_analyses table with full 10-category scoring and detailed reports
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS skills_score INT DEFAULT 0;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS experience_score INT DEFAULT 0;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS education_score INT DEFAULT 0;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS structure_score INT DEFAULT 0;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS achievements_score INT DEFAULT 0;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS contact_score INT DEFAULT 0;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS compatibility_score INT DEFAULT 0;

ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS matching_keywords JSONB;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS strengths JSONB;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS weaknesses JSONB;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS improvement_checklist JSONB;
ALTER TABLE ats_analyses ADD COLUMN IF NOT EXISTS job_description_hash VARCHAR(64);

CREATE INDEX IF NOT EXISTS idx_ats_history ON ats_analyses(resume_version_id, created_at DESC);
