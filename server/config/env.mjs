import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

loadEnv();

const PORT = Number(
  process.env.PORT ||
  process.env.API_PORT ||
  4000
);
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || "acadhub_management";
if (
  process.env.NODE_ENV === "production" &&
  (!process.env.AUTH_SECRET || Buffer.byteLength(process.env.AUTH_SECRET) < 32)
) {
  throw new Error("AUTH_SECRET must contain at least 32 bytes in production.");
}

const AUTH_SECRET = process.env.AUTH_SECRET || randomBytes(32).toString("base64url");
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

function loadEnv() {
  const envPaths = [".env", "server/.env"];

  for (const envPath of envPaths) {
    try {
      const env = readFileSync(envPath, "utf8");

      for (const line of env.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) continue;

        const separator = trimmed.indexOf("=");

        if (separator === -1) continue;

        const key = trimmed.slice(0, separator).trim();

        const value = trimmed
          .slice(separator + 1)
          .trim()
          .replace(/^['"]|['"]$/g, "");

        if (!(key in process.env))
          process.env[key] = value;
      }
    } catch {
      // Ignore missing env files and let runtime env vars take precedence.
    }
  }
}


export {
  PORT,
  MONGODB_URI,
  DB_NAME,
  AUTH_SECRET,
  TOKEN_TTL_SECONDS,
};