/**
 * Normalizes the database connection env vars before Prisma/Next run.
 *
 * Prisma's schema expects DATABASE_URL (pooled) and DIRECT_URL (direct).
 * Some hosts inject Neon connection strings under different names —
 * e.g. Netlify's "Neon" extension sets NETLIFY_DATABASE_URL and
 * NETLIFY_DATABASE_URL_UNPOOLED instead. This script writes a plain
 * DATABASE_URL/DIRECT_URL pair to .env files so every downstream tool
 * (Prisma CLI, `next build`) finds them regardless of which host or
 * naming convention supplied the originals.
 */
const fs = require("fs");
const path = require("path");

function pick(...names) {
  for (const name of names) {
    if (process.env[name]) return process.env[name];
  }
  return undefined;
}

const databaseUrl = pick("DATABASE_URL", "NETLIFY_DATABASE_URL");
const directUrl = pick("DIRECT_URL", "NETLIFY_DATABASE_URL_UNPOOLED") || databaseUrl;

if (!databaseUrl || !directUrl) {
  console.error(
    "\nNo database connection string found.\n" +
      "Set DATABASE_URL and DIRECT_URL in your deploy environment " +
      "(or connect a Neon database so NETLIFY_DATABASE_URL / " +
      "NETLIFY_DATABASE_URL_UNPOOLED are provided).\n"
  );
  process.exit(1);
}

const contents = `DATABASE_URL="${databaseUrl}"\nDIRECT_URL="${directUrl}"\n`;

// Write ONLY the project-root .env: Next.js reads it directly, and Prisma
// CLI falls back to the project root whenever prisma/.env doesn't exist.
// Writing to both prisma/.env and .env makes Prisma 5.x treat the (even
// identical) duplicate DATABASE_URL/DIRECT_URL declarations as a conflict
// and refuse to run.
fs.writeFileSync(path.join(process.cwd(), ".env"), contents);

console.log("Resolved DATABASE_URL/DIRECT_URL for this build.");
