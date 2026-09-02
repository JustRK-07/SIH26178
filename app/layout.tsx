import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VYRON — India's environmental intelligence, before disaster strikes",
  description:
    "Distributed AI sensor nodes detect floods, fires, pollution, and landslides at the edge — and tell authorities what's coming.",
  metadataBase: new URL("https://vyron.example.com"),
  openGraph: {
    title: "VYRON",
    description:
      "Distributed AI sensor nodes detect floods, fires, pollution, and landslides at the edge.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
