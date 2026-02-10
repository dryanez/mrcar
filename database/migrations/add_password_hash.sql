-- Add password_hash column to users table
-- This allows the system to store user passwords for authentication

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN users.password_hash IS 'User password - stored as plain text for now (use bcrypt in production)';

-- Note: Existing users will have NULL password_hash
-- They need to have their password reset by an admin to be able to login
