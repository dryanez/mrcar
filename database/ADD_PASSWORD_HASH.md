# Adding Password Hash Column to Users Table

## Issue
The application expects a `password_hash` column in the `users` table, but it doesn't exist in the database.

## Solution
Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;
```

## Steps to Apply:

### Option 1: Supabase Dashboard (Easiest)
1. Go to: https://yufszwebosekijdgjgtb.supabase.co
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Copy and paste:
   ```sql
   ALTER TABLE users 
   ADD COLUMN IF NOT EXISTS password_hash TEXT;
   ```
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. ✅ Done!

### Option 2: Using Migration File
1. The migration is in: `database/migrations/add_password_hash.sql`
2. Copy the contents
3. Run in Supabase SQL Editor

## After Running Migration:

### For Existing Users:
All existing users will have `password_hash = NULL` and **won't be able to login** until:
1. Admin logs in as: `admin@mrcar.cl` / `admin` (hardcoded, doesn't need password_hash)
2. Admin goes to `/admin/users/[user-id]/edit`
3. Admin clicks "Cambiar Contraseña" and sets a new password
4. Now user can login!

### For New Users:
- Created through admin panel
- Password automatically set during creation
- Can login immediately with the generated password

## Verification:
After running the migration, check the table structure:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users';
```

You should see `password_hash | text | YES`

---

**Run this now in Supabase and the error will be fixed!** 🚀
