import { Fraunces, Space_Mono } from "next/font/google";
import "./cina.css";

const serif = Fraunces({
  subsets: ["latin"],
  // Variable font (no fixed weights) so the WONK axis is available for the swash italic "& Re-Fill".
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-cina-serif",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cina-mono",
  display: "swap",
});

/** CINA stands alone: its own header, palette and footer, none of the Powering House chrome. */
export default function CinaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`cina ${serif.variable} ${mono.variable}`}>{children}</div>;
}
