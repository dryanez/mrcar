-- ============================================
-- MrCar Multi-User System - Database Schema
-- ============================================

-- 1. Create users table (separate from Supabase auth for flexibility)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    sucursal TEXT NOT NULL CHECK (sucursal IN ('Vitacura', 'Viña del Mar')),
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    last_login TIMESTAMPTZ,
    
    -- Supabase auth user ID (if using Supabase Auth)
    auth_user_id UUID UNIQUE
);

-- 2. Add user tracking to appraisals table
ALTER TABLE appraisals 
ADD COLUMN IF NOT EXISTS created_by_user_id UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS sucursal TEXT CHECK (sucursal IN ('Vitacura', 'Viña del Mar'));

-- 3. Create index for performance
CREATE INDEX IF NOT EXISTS idx_appraisals_user ON appraisals(created_by_user_id);
CREATE INDEX IF NOT EXISTS idx_appraisals_sucursal ON appraisals(sucursal);
CREATE INDEX IF NOT EXISTS idx_appraisals_created_at ON appraisals(created_at);
CREATE INDEX IF NOT EXISTS idx_users_sucursal ON users(sucursal);

-- 4. Create user_sessions table for simple auth (without Supabase Auth)
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id);

-- 5. Create admin user
INSERT INTO users (email, nombre, apellido, sucursal, role, is_active)
VALUES ('admin@mrcar.cl', 'Admin', 'MrCar', 'Vitacura', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- 6. Create analytics view for easy querying
CREATE OR REPLACE VIEW appraisal_analytics AS
SELECT 
    a.*,
    u.nombre AS user_nombre,
    u.apellido AS user_apellido,
    u.sucursal AS user_sucursal,
    DATE_TRUNC('week', a.created_at) AS week_start,
    DATE_TRUNC('month', a.created_at) AS month_start
FROM appraisals a
LEFT JOIN users u ON a.created_by_user_id = u.id;

-- 7. Enable RLS (Row Level Security) - Optional but recommended
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Allow admins to see all users
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT
    USING (id = auth.uid());

-- Only admins can create users
CREATE POLICY "Admins can create users" ON users
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 8. Create function to get monthly trends
CREATE OR REPLACE FUNCTION get_monthly_trends()
RETURNS TABLE (
    current_month_total BIGINT,
    last_month_total BIGINT,
    trend_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH current_month AS (
        SELECT COUNT(*) as total
        FROM appraisals
        WHERE created_at >= DATE_TRUNC('month', NOW())
    ),
    last_month AS (
        SELECT COUNT(*) as total
        FROM appraisals
        WHERE created_at >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')
          AND created_at < DATE_TRUNC('month', NOW())
    )
    SELECT 
        c.total,
        l.total,
        CASE 
            WHEN l.total = 0 THEN 0
            ELSE ROUND(((c.total - l.total)::NUMERIC / l.total::NUMERIC) * 100, 1)
        END
    FROM current_month c, last_month l;
END;
$$ LANGUAGE plpgsql;

-- 9. Create function to get user stats
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID DEFAULT NULL)
RETURNS TABLE (
    user_id UUID,
    user_name TEXT,
    sucursal TEXT,
    total_appraisals BIGINT,
    this_week BIGINT,
    this_month BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.nombre || ' ' || u.apellido,
        u.sucursal,
        COUNT(a.id)::BIGINT,
        COUNT(CASE WHEN a.created_at >= DATE_TRUNC('week', NOW()) THEN 1 END)::BIGINT,
        COUNT(CASE WHEN a.created_at >= DATE_TRUNC('month', NOW()) THEN 1 END)::BIGINT
    FROM users u
    LEFT JOIN appraisals a ON u.id = a.created_by_user_id
    WHERE (user_uuid IS NULL OR u.id = user_uuid)
      AND u.role = 'user'
    GROUP BY u.id, u.nombre, u.apellido, u.sucursal
    ORDER BY total_appraisals DESC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE users IS 'User accounts for MrCar system';
COMMENT ON TABLE user_sessions IS 'Simple session management for authentication';
COMMENT ON VIEW appraisal_analytics IS 'Analytics view with user and time dimensions';
