# 🌟 Beauty of Cloud 2.0

**Sri Lanka's first student-led inter-university cloud ideathon** — second edition.

This is a Next.js 16 (Turbopack) application with real-time Firestore database integration, built for managing delegate registration, task tracking, and attendance records for the Beauty of Cloud ideathon event.

## ✨ Features

- **Glassmorphism UI Design**: Premium dark-themed interface with glass-like components
- **Delegate Registration**: Session-based registration for participants
- **Admin Dashboard**: Task tracking, attendance management, team member management
- **Real-time Sync**: Firestore integration for live data updates
- **Export to Excel**: Download tasks and attendance records as `.xlsx` files
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Type-Safe**: Full TypeScript strict mode enabled

## 🚀 Quick Start

### Prerequisites
- Node.js v22+ (or Bun v1.3.10+)
- Bun package manager recommended

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd beauty-of-cloud-official

# Install dependencies
bun install

# Copy environment template
cp .env.example .env.local

# Add your Firebase credentials to .env.local
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build & Deploy

```bash
# Lint code
bun run lint

# Build for production
bun run build

# Test production build locally
bun start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 16 App Router
│   ├── admin/             # Admin dashboard (scoped layout)
│   │   ├── task-tracking/
│   │   ├── attendance/
│   │   ├── email-tool/
│   │   └── layout.tsx     # Admin providers
│   ├── register/          # Public registration pages
│   ├── layout.tsx         # Root layout (AuthProvider)
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   └── ui/               # UI primitives (GlassCard, ExportButton)
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Firebase Auth state
│   └── DataContext.tsx   # Admin data state
├── firebase/             # Firebase configuration
│   ├── config.ts        # Firebase SDK setup
│   └── api.ts           # Firestore CRUD operations
├── types/                # Centralized TypeScript types
│   └── index.ts
└── utils/                # Utility functions
    └── excel-export.ts   # Excel export helpers
```

## 🔧 Configuration

### Environment Variables

Add to `.env.local` (git-ignored):

```
NEXT_PUBLIC_FIREBASE_API_KEY=<your-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
```

See `.env.example` for the template.

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Set up Authentication (if needed)
4. Copy Web App credentials to `.env.local`

## 📝 Key Features

### Task Tracking (`/admin/task-tracking`)
- Create, edit, delete tasks
- Assign tasks to team members
- Track status (Todo → In Progress → Done)
- Set priority levels (Low, Medium, High)
- Search & filter tasks
- Export tasks to Excel

### Attendance Management (`/admin/attendance`)
- Log meetings with descriptions
- Mark attendance for team members
- Track meeting history
- Export attendance reports to Excel

### Delegate Registration (`/register/*`)
- Public-facing registration pages
- Session-based signup
- Competition registration

## 🎨 Design System

- **Colors**: Deep dark backgrounds (`#030712`), cyan, indigo, emerald accents
- **Typography**: Geist font family
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4 with custom glassmorphism components

## 🔐 Security

- ✅ Auth Context protects state management
- ✅ Scoped layouts prevent unauthorized data access
- ✅ Firebase Security Rules protect data
- ✅ `.env.local` git-ignored (never commit secrets)
- ✅ Type-safe data flows prevent runtime errors

## 💾 Database Structure

```typescript
// Tasks
{
  title: string;
  assignees: string[];
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  createdAt?: Timestamp;
}

// Meetings
{
  title: string;
  description: string;
  date: string;
  presentMemberIds: string[];
  createdAt?: Timestamp;
}

// Team Members
{
  name: string;
  createdAt?: Timestamp;
}
```

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings
4. Auto-deployment on every push to `main`

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 👥 Team

Beauty of Cloud 2.0 is a student-led initiative for Sri Lanka's cloud computing community.

## 📝 License

All rights reserved. Beauty of Cloud 2.0 © 2026

---

For questions or contributions, reach out to the team!

