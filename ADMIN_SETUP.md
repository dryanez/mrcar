# 🔐 Admin Panel Setup Instructions

## Prerequisites

Before using the admin panel, you need to:

### 1. Run the Database Schema

Copy the contents of `database/multi_user_schema.sql` and run it in your Supabase SQL Editor:

```sql
-- Creates:
-- - users table
-- - user_sessions table
-- - Analytics functions
-- - Admin user
```

### 2. Set Up Resend API (for sending emails)

1. Go to [resend.com](https://resend.com) and sign up
2. Get your API key from the dashboard
3. Add to `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production URL
```

**Note:** Resend free tier allows 100 emails/day. Update the `from` email in `lib/actions/user-actions.ts` once you have a verified domain.

---

## Admin Access

### Login Credentials (Hard-coded)

- **URL:** `/admin/login`
- **Email:** `admin@mrcar.cl`
- **Password:** `admin`

---

## Features

### ✅ Authentication
- Session-based auth with cookies
- 7-day session expiry
- Secure password handling (hardcoded for admin, can be extended)

### ✅ User Management
- Create users with auto-generated passwords
- Email notifications via Resend
- Track users by sucursal (Vitacura, Viña del Mar)
- Activate/deactivate users

### ✅ Admin Dashboard
- Total users count
- Monthly appraisal trends (real percentages!)
- Location breakdown
- Quick actions

### ✅ Email System
- Welcome emails with credentials
- HTML email templates
- Automatic sending on user creation

---

## Admin Panel Routes

```
/admin                         → Redirects to /admin/login
/admin/login                   → Login page
/admin/dashboard               → Admin overview
/admin/users                   → User management table
/admin/users/new               → Create new user form
/admin/analytics               → (Coming soon) Analytics dashboard
```

---

## Next Steps

### Immediate:
1. ✅ Run database schema
2. ✅ Add RESEND_API_KEY to `.env.local`
3. ✅ Test login at `/admin/login`
4. ✅ Create a test user

### Future Enhancements:
- [ ] Analytics dashboard with charts
- [ ] Weekly reports
- [ ] Export to Excel
- [ ] User password reset
- [ ] User profile editing
- [ ] Role-based permissions

---

## Security Notes

- Admin password is hardcoded (`admin`/`admin`) - **change this in production!**
- Sessions are stored in database with 7-day expiry
- RLS (Row Level Security) enabled on users table
- Email sending errors don't block user creation

---

## Troubleshooting

### "No autenticado" error
- Clear cookies and login again
- Check if session expired (7 days)

### Email not sending
- Verify RESEND_API_KEY in `.env.local`
- Check Resend dashboard for errors
- User is still created even if email fails

### Can't access admin pages
- Ensure you ran `database/multi_user_schema.sql`
- Check that admin user exists in `users` table
- Verify you're using credentials: `admin@mrcar.cl` / `admin`

---

## Database Schema

Key tables:
- `users` - User accounts with email, nombre, apellido, sucursal
- `user_sessions` - Active sessions
- `appraisals` - (Updated) Now includes `created_by_user_id` and `sucursal`

Key functions:
- `get_monthly_trends()` - Calculate month-over-month growth
- `get_user_stats()` - Per-user performance metrics
