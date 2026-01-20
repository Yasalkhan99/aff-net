# LinksCircle - Affiliate Network Platform

A complete affiliate marketing platform built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **Role-Based Authentication**: Publisher and Admin roles
- **Publisher Dashboard**: Earnings overview, performance metrics, profile completeness
- **Advertiser Management**: Browse, filter, and manage advertisers
- **Tracking Link Generation**: Create unique tracking links for each publisher-advertiser combination
- **Click Tracking**: Track clicks and conversions
- **Commission Management**: Track pending, approved, declined, and paid commissions

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd affiliatenetwork
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and secrets:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/linkscircle?schema=public"
NEXTAUTH_SECRET="your-secret-key"
JWT_SECRET="your-jwt-secret"
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Or push schema directly (for development)
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
affiliatenetwork/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   └── publisher/          # Publisher pages
│   ├── components/             # React components
│   │   ├── common/             # Shared components
│   │   └── publisher/          # Publisher-specific components
│   ├── lib/                    # Utility functions
│   │   ├── prisma.ts           # Prisma client
│   │   ├── auth.ts             # Authentication helpers
│   │   ├── tracking.ts         # Tracking link functions
│   │   └── utils.ts            # General utilities
│   └── types/                  # TypeScript types
└── public/                     # Static assets
```

## API Routes

### Authentication
- `POST /api/auth/signup` - Create new publisher account
- `POST /api/auth/login` - Login user

### Publisher
- `GET /api/publisher/dashboard` - Get dashboard data
- `GET /api/publisher/advertisers` - Get advertisers list
- `GET /api/publisher/advertisers/[id]` - Get advertiser details
- `POST /api/publisher/tracking-links/create` - Create tracking link
- `GET /api/publisher/tracking-links` - Get tracking links

### Tracking
- `GET /go/short/[code]` - Redirect tracking link and record click

## Database Schema

### Models
- **User**: Users (publishers and admins)
- **PublisherProfile**: Publisher profile completion tracking
- **Advertiser**: Advertiser information
- **TrackingLink**: Generated tracking links
- **LinkClick**: Click tracking data
- **Commission**: Commission records

## Development

### Run Prisma Studio
```bash
npm run db:studio
```

### Type checking
```bash
npm run type-check
```

### Build for production
```bash
npm run build
npm start
```

## Deployment

See AWS deployment architecture documentation for production deployment setup.

## License

MIT




