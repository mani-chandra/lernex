import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lernex Admissions",
  description:
    "Register for medical college counseling and B.Tech AI/ML admissions with Lernex.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-zinc-50 text-zinc-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
