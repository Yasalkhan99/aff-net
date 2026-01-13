# Supabase Connection String Fix

## Current Issue
Prisma can't connect to Supabase database at port 5432.

## Solution Steps:

### Step 1: Get Connection Pooling String from Supabase

1. Go to **Supabase Dashboard** → Your Project
2. Click **Settings** (gear icon) → **Database**
3. Scroll to **Connection string** section
4. Select **Connection pooling** tab (NOT direct connection)
5. Copy the connection string

It should look like:
```
postgresql://postgres.acjezcxywhifwgsydstw:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### Step 2: Update .env File

Replace `DATABASE_URL` in `.env` file with the connection pooling string from Supabase:

```env
DATABASE_URL=postgresql://postgres.acjezcxywhifwgsydstw:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Important:**
- Replace `[PASSWORD]` with your database password (URL encode if needed)
- Replace `[REGION]` with your Supabase region (e.g., `us-east-1`, `ap-south-1`)

### Step 3: URL Encode Password (if needed)

If password has special characters:
- `*` → `%2A`
- `[` → `%5B`
- `]` → `%5D`
- etc.

Or use a simple password without special characters.

### Step 4: Check Network Restrictions

Supabase Dashboard → Settings → Database → Network restrictions
- Enable "Allow all IPs" for development

### Step 5: Test Connection

```bash
npm run db:generate
npm run db:push
```

### Alternative: Direct Connection (if pooling doesn't work)

Use direct connection string from Supabase Dashboard:
```
postgresql://postgres:[PASSWORD]@db.acjezcxywhifwgsydstw.supabase.co:5432/postgres
```

Make sure:
- SSL is enabled: Add `?sslmode=require`
- Your IP is allowed in network restrictions

