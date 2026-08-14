import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Powering House — Gachoka Kang'ata",
    template: "%s — Powering House",
  },
  description:
    "Business design, money discipline, and growth systems for Kenyan business owners, from Gachoka Kang'ata.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
