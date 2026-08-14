/**
 * Generates the fixed set of image crops the design needs from the single
 * source headshot at the project root. Run once locally after replacing
 * Gachoka.jpg; the outputs are committed to public/images/.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = path.resolve(process.cwd(), "Gachoka.jpg");
const OUT_DIR = path.resolve(process.cwd(), "public", "images");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const meta = await sharp(SOURCE).metadata();
  if (!meta.width || !meta.height) {
    throw new Error("Could not read source image dimensions from Gachoka.jpg");
  }

  // Nav avatar: tight square, upper-center weighted (face).
  await sharp(SOURCE)
    .resize(160, 160, { fit: "cover", position: "top" })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, "avatar.jpg"));

  // Desktop hero: wide full-bleed crop, matches object-position 57% 20% in the reference CSS.
  await sharp(SOURCE)
    .resize(1800, 1200, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 85 })
    .toFile(path.join(OUT_DIR, "hero-desktop.jpg"));

  // Mobile hero: taller 4:5 art-directed crop for the stacked mobile layout.
  await sharp(SOURCE)
    .resize(1000, 1250, { fit: "cover", position: "top" })
    .jpeg({ quality: 85 })
    .toFile(path.join(OUT_DIR, "hero-mobile.jpg"));

  console.log("Generated public/images/avatar.jpg, hero-desktop.jpg, hero-mobile.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
