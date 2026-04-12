"use client";

import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

/**
 * ADMIN LAYOUT
 * 
 * Scoping the Auth and Data providers here ensures that 
 * Admin-specific state and logic are NOT loaded for delegates
 * or other public-facing pages.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      {children}
    </DataProvider>
  );
}
