-- Flyway Migration V10__admin_dashboard.sql

-- 1. Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action_type VARCHAR(100) NOT NULL, -- 'BLOCK_USER', 'UNBLOCK_USER', 'CHANGE_PLAN', 'REFUND_PAYMENT', 'PRICE_CHANGE'
    target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    details_json JSONB NOT NULL,
    ip_address VARCHAR(45) DEFAULT '127.0.0.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_admin_audit_logs ON admin_audit_logs(admin_id, action_type);

-- 2. System Metrics Table
CREATE TABLE IF NOT EXISTS system_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpu_usage_percent DOUBLE PRECISION NOT NULL DEFAULT 12.5,
    memory_used_mb INT NOT NULL DEFAULT 512,
    active_db_connections INT NOT NULL DEFAULT 8,
    uptime_seconds BIGINT NOT NULL DEFAULT 86400,
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Daily Statistics Table for Fast Aggregated Analytics
CREATE TABLE IF NOT EXISTS daily_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stat_date DATE NOT NULL UNIQUE,
    new_signups INT NOT NULL DEFAULT 0,
    total_revenue_inr INT NOT NULL DEFAULT 0,
    ats_analyses_count INT NOT NULL DEFAULT 0,
    ai_rewrites_count INT NOT NULL DEFAULT 0,
    interviews_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_daily_statistics_date ON daily_statistics(stat_date DESC);
