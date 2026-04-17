import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const reglo = localFont({
  src: "../../public/Reglo-Bold.otf",
  variable: "--font-reglo",
  display: "swap",
});

const uncut = localFont({
  src: "../../public/UncutSans-Variable.ttf",
  variable: "--font-uncut",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beauty of Cloud 2.0 | Sri Lanka's Inter-University Cloud Ideathon",
  description:
    "Beauty of Cloud 2.0 is Sri Lanka's first student-led inter-university cloud ideathon — second edition. Register as a delegate, explore sessions, and compete.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${reglo.variable} ${uncut.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-uncut">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
