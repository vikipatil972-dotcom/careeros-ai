-- Flyway Migration V3__resume_engine.sql

-- 1. Extend resume_versions table with SHA-256 content hash and extra parsed fields
ALTER TABLE resume_versions ADD COLUMN IF NOT EXISTS file_hash VARCHAR(64);
ALTER TABLE resume_versions ADD COLUMN IF NOT EXISTS parsed_projects JSONB;
ALTER TABLE resume_versions ADD COLUMN IF NOT EXISTS parsed_certifications JSONB;
ALTER TABLE resume_versions ADD COLUMN IF NOT EXISTS parsed_languages JSONB;
ALTER TABLE resume_versions ADD COLUMN IF NOT EXISTS parsed_links JSONB;

-- 2. File Hashes Table for Duplicate Detection & Integrity
CREATE TABLE IF NOT EXISTS file_hashes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_hash VARCHAR(64) NOT NULL,
    resume_version_id UUID NOT NULL REFERENCES resume_versions(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_file_hashes_user_hash ON file_hashes(user_id, file_hash);
CREATE INDEX idx_file_hashes_version ON file_hashes(resume_version_id);
