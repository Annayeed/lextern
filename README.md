# LexTern — Internship OS for Law Students

A production-ready Next.js 15 application for tracking internship applications.

## Stack
- **Next.js 15** (App Router, Server Actions)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + Database + Row Level Security)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
```
Fill in your Supabase project URL and anon key from the Supabase dashboard → Project Settings → API.

### 3. Set up the database
Run the SQL migrations in Supabase SQL Editor in this order:
1. `profiles` table (already documented)
2. `applications` table (already documented)

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy
Push to GitHub → Vercel auto-deploys. Add environment variables in Vercel dashboard.

## Project structure
```
app/
  (auth)/login/        — Login page
  (auth)/signup/       — Signup page
  dashboard/           — Main dashboard (list + kanban views)
  applications/new/    — Add application form
  applications/[id]/   — Application detail
  applications/[id]/edit/ — Edit form
  profile/             — Student profile + settings

components/
  layout/              — Sidebar, MobileNav, AppShell
  applications/        — ApplicationCard, KanbanBoard, ApplicationForm
  ui/                  — StatusBadge, StatsCard, EmptyState, ConfirmDialog

lib/
  supabase.ts          — Browser client
  supabase-server.ts   — Server client (SSR)
  actions.ts           — Server Actions (auth + CRUD)
  utils.ts             — Date helpers, cn()

types/index.ts         — TypeScript types + status config
middleware.ts          — Auth route protection
```

## Features
- Email + password authentication
- Internship application tracker (list view + Kanban board)
- 7 application statuses: Wishlist → Applied → Follow-up Due → Interview → Offer → Accepted/Rejected
- Overdue follow-up and upcoming deadline alerts on dashboard
- Full CRUD: add, edit, delete applications
- Student profile page with notification preferences
- Mobile-responsive (bottom nav on mobile, sidebar on desktop)
- Row Level Security: each student sees only their own data
