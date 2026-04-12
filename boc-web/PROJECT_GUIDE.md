# 🚀 Beauty of Cloud - Project Architecture Guide (for AI Agents)

This document serves as the "Source of Truth" for any AI agent or developer working on this project. It outlines the core architecture, security patterns, and where to find key files.

---

## 🏗️ Core Directory Structure

- **`/src/app`**: Next.js 16 (Turbopack) - App Router.
  - **`/admin`**: The admin dashboard (Task Tracking, Attendance).
  - **`/register`**: Public-facing delegate registration (Session-based).
- **`/src/context`**: React Context providers for global state management.
- **`/src/firebase`**: All Firebase integration logic (Config & API).
- **`/src/types`**: Centralized TypeScript interfaces.
- **`/src/utils`**: Global utility functions (Excel exports, formatting).

---

## 🔐 Security & Provider Architecture (Crucial)

We use a **Scoped Layout Pattern** to ensure data isolation:

1.  **`AuthProvider` (Global)**: Located in `src/app/layout.tsx`. Provides the `user` object for authentication state across the entire app.
2.  **`DataProvider` (Scoped)**: Located in `src/app/admin/layout.tsx`. Contains internal "Admin" data (Tasks, Meetings, Team Members). 
    - **Security Rule**: By scoping it to `/admin`, the data logic is **never loaded** for delegates on the public `/register` pages.

---

## 🛠️ Key Files to Remember

### 1. Data Types
- **Path**: `src/types/index.ts`
- **Rule**: All major interfaces (`Task`, `TeamMember`, `Meeting`) MUST be defined here and shared across the project. Do NOT define local versions of these types.

### 2. Firestore API & Config
- **Path**: `src/firebase/config.ts` (Firebase credentials)
- **Path**: `src/firebase/api.ts` (Firestore CRUD)
- **Instruction**: Use the exported functions (e.g., `getTasks`, `addMeeting`) instead of writing raw Firestore queries in your components.

### 3. Navigation & Routing
- **Admin Dashboard**: `/admin`
- **Task Tracking**: `/admin/task-tracking`
- **Attendance**: `/admin/attendance` (**HIDDEN ROUTE** - Not linked on the main dashboard UI).
- **Delegate Registration**: `/register/session/[id]` and `/register/compitition`.

---

## 🎨 UI & Design Language

- **Aesthetic**: Premium Glassmorphism.
- **Colors**: Deep dark backgrounds (`#030712`), cyan accents for tasks, indigo/purple for session registrations, emerald for attendance.
- **Libraries**: Lucide-React for icons, Framer-Motion for animations, Tailwind CSS for styling.

---

## 📥 Export Utility
- **Path**: `src/utils/excel-export.ts`
- **Capability**: Exports both Tasks and Attendance Records to `.xlsx` files using the `xlsx` library.

---

> [!TIP]
> **Working with this project**: Always prioritize type safety and follow the established "Actions" pattern in the pages. Do not add sensitive admin providers to the root `layout.tsx` unless authentication logic requires it for the whole app.
