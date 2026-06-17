import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "LexTern", template: "%s · LexTern" },
  description: "Internship management for law students",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
