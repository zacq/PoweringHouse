import type { Metadata } from "next";
import { GachokaBio } from "@/components/gachoka-bio";

export const metadata: Metadata = {
  title: "About Gachoka Kang'ata",
  description:
    "Gachoka Kang'ata — founder of Powering House, CEO of Cygnus Consulting, expert in operations excellence and business finance operations.",
};

/** Gachoka's profile, moved off the home page so it can grow into a fuller page. */
export default function AboutGachokaPage() {
  return (
    <div className="about-page">
      <GachokaBio />
    </div>
  );
}
