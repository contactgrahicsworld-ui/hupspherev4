import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HubSphere Enterprise V4 — Business Operating System",
  description: "Production-grade multi-tenant AI-powered enterprise SaaS platform with physical SIM telecalling and five autonomous agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
