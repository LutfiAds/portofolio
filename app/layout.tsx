import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhamad Lutfi Adli Setiawan | Security Engineer",
  description:
    "Cybersecurity portfolio focused on detection engineering, privileged access automation, and authentication anomaly detection."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
