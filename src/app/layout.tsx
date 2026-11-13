import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#020617",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "HubSphere Enterprise V4 — Cross-Platform Business Operating System",
  description: "Enterprise SaaS OS compatible with Android, iOS, Windows, and Mac. Native physical SIM telecalling, 5 autonomous AI agents, multi-tenant cloud storage in Supabase.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HubSphere V4",
  },
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none sm:select-auto overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
