# Supabase Database Setup Guide

## Step 1: Get Supabase Connection String

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in the left sidebar
3. Go to **Database** section
4. Scroll down to **Connection string**
5. Select **Connection pooling** mode (recommended for serverless)
6. Copy the connection string

### Connection String Format:

**With Connection Pooling (Recommended):**
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Direct Connection:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## Step 2: Create .env File

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and paste your Supabase connection string:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
NEXTAUTH_SECRET="generate-a-random-secret-here"
JWT_SECRET="generate-another-random-secret-here"
```

**Important:** Replace:
- `[PROJECT-REF]` with your Supabase project reference
- `[YOUR-PASSWORD]` with your database password
- `[REGION]` with your Supabase region (e.g., `us-east-1`)

## Step 3: Generate Secrets

Generate random secrets for JWT and NextAuth:

```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## Step 4: Push Database Schema

Run these commands to create all tables in Supabase:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to Supabase (creates all tables)
npm run db:push
```

This will create all the tables:
- User
- PublisherProfile
- Advertiser
- TrackingLink
- LinkClick
- Commission

## Step 5: Verify Setup

1. Check Supabase Dashboard > Table Editor - you should see all tables
2. Or use Prisma Studio:
```bash
npm run db:studio
```

## Step 6: Test Connection

Start your development server:
```bash
npm run dev
```

Try to signup a new user - if it works, your database is connected!

## Troubleshooting

### Connection Error?
- Make sure your password is correct (no special characters need encoding)
- Check if your IP is allowed in Supabase (Settings > Database > Connection pooling)
- Try direct connection string instead of pooling

### SSL Error?
Add `?sslmode=require` to connection string:
```
DATABASE_URL="postgresql://...?sslmode=require"
```

### Connection Pooling Issues?
Use direct connection for development:
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

## Supabase Dashboard

You can view and manage your data at:
- **Table Editor**: View/edit data directly
- **SQL Editor**: Run custom queries
- **Database**: See connection info and settings


