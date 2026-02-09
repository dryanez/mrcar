# 🚀 MrCar Multi-User System Implementation Plan

## Phase 1: Database Setup ✅
**Files:** `database/multi_user_schema.sql`

### Schema Components:
1. ✅ **users table** - Store user accounts
   - Fields: email, nombre, apellido, sucursal, role
   - Sucursales: Vitacura, Viña del Mar
   - Roles: admin, user

2. ✅ **user_sessions table** - Simple authentication
   - Session tokens, expiry, IP tracking

3. ✅ **Updated appraisals** - Link to users & locations
   - created_by_user_id
   - sucursal

4. ✅ **Analytics functions** - SQL functions for stats
   - `get_monthly_trends()` - Real percentage trends
   - `get_user_stats()` - Per-user performance

5. ✅ **appraisal_analytics view** - Easy querying

### TODO:
- [ ] Run schema in Supabase SQL Editor
- [ ] Create admin user (admin@mrcar.cl)

---

## Phase 2: Authentication System
**Target:** Simple email/password auth

### Components to Build:
1. **Login API** (`/api/auth/login`)
   - POST: email + password
   - Return: session token
   - For admin: hardcoded admin/admin

2. **Session middleware**
   - Check session token
   - Attach user to request

3. **Logout API** (`/api/auth/logout`)
   - Invalidate session

4. **Protected routes**
   - Redirect to /login if not authenticated

---

## Phase 3: Admin Panel
**Route:** `/admin`
**Access:** admin/admin

### Pages to Create:
1. **Login Page** (`/admin/login`)
   - Simple form: email/password
   - Hardcoded: admin/admin

2. **Admin Dashboard** (`/admin/dashboard`)
   - Total users
   - Recent signups
   - Quick stats

3. **User Management** (`/admin/users`)
   - List all users
   - Create new user button
   - Edit/deactivate users

4. **Create User Form** (`/admin/users/new`)
   - Fields: nombre, apellido, email, sucursal
   - Generate random password
   - Send email with credentials

---

## Phase 4: Email System
**Service:** Resend API (resend.com) - Free tier: 100 emails/day

### Setup:
1. Install Resend SDK
2. Create email template
3. Send welcome email on user creation
   - Subject: "Bienvenido a MrCar"
   - Include: email, temporary password
   - "Change password on first login"

---

## Phase 5: User Features
**Routes:** `/dashboard/*` (updated for multi-user)

### Updates Needed:
1. **Track current user** in session
2. **Filter appraisals** by user (optional: see all if admin)
3. **Add sucursal** to appraisal form
4. **User profile** page (change password, view stats)

---

## Phase 6: Analytics Dashboard
**Route:** `/analytics`

### Views to Create:
1. **Overview**
   - Real monthly trends (from SQL function)
   - Week-over-week growth
   - Total vs Completed

2. **By User**
   - Table: User | Sucursal | Total | This Week | This Month
   - Sortable columns
   - Chart: Top performers

3. **By Location**
   - Vitacura vs Viña del Mar
   - Weekly breakdown
   - Pie chart

4. **Weekly Report**
   - Calendar view
   - Ma appraisals per week
   - Filter by user/location

---

## Implementation Priority:

### Must Have (MVP):
1. ✅ Database schema
2. Admin login (hardcoded)
3. User management (CRUD)
4. Email sending (Resend)
5. Link appraisals to users

### Should Have:
6. Real trend calculations
7. Basic analytics dashboard
8. User stats

### Nice to Have:
9. Weekly reports
10. Advanced filtering
11. Export to Excel
12. Charts & graphs

---

## Next Steps:
1. **Run database/multi_user_schema.sql in Supabase**
2. Create admin login page
3. Build user management interface
4. Set up Resend for emails
5. Update appraisal form to track user

**Estimated Time:** 3-4 hours for full implementation

---

## Notes:
- Using simple session-based auth (not Supabase Auth initially)
- Admin credentials: admin@mrcar.cl / admin
- Generated passwords for new users
- Email verification optional (can add later)
