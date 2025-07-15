import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { metadata as siteMetadata } from "./metadata";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AdminProvider } from "@/lib/context/AdminContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <AuthProvider>
          <AdminProvider>
            <ClientBody>{children}</ClientBody>
            <Toaster />
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
