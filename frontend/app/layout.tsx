import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrenchesPad - Tokenized Crowdfunding on Base",
  description: "A minimal, on-chain launchpad built for people who value control. Launch projects, issue tokens, and fund the future.",
  keywords: ["blockchain", "crowdfunding", "tokenization", "Base", "Web3", "DeFi"],
  authors: [{ name: "TrenchesPad" }],
  openGraph: {
    title: "TrenchesPad - Tokenized Crowdfunding on Base",
    description: "Secure. Minimal. On-chain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

