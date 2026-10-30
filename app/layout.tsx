import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NurShop | Premium online do'kon",
  description: "Modern e-commerce platform for Uzbekistan"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
