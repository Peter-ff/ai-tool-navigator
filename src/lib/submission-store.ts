import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export interface Submission {
  slug: string;
  name: string;
  website: string;
  tagline: string;
  category: string;
  description: string;
  submitted_at: string;
  status: "pending";
}

const SUBMISSIONS_DIR = path.join(process.cwd(), "content/submissions");

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function saveToFile(submission: Submission): void {
  if (!fs.existsSync(SUBMISSIONS_DIR)) {
    fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
  }
  const timestamp = submission.submitted_at.slice(0, 19).replace(/:/g, "-");
  const fileName = `${timestamp}-${submission.slug}.json`;
  fs.writeFileSync(
    path.join(SUBMISSIONS_DIR, fileName),
    JSON.stringify(submission, null, 2),
    "utf-8"
  );
}

export async function saveSubmission(submission: Submission): Promise<{ success: boolean; error?: string }> {
  const redis = getRedis();
  if (redis) {
    try {
      const key = `submission:${Date.now()}:${submission.slug}`;
      await redis.set(key, JSON.stringify(submission));
      return { success: true };
    } catch (e) {
      console.error("Redis save error:", e);
      return { success: false, error: "Storage error" };
    }
  }
  // Dev fallback: write to local filesystem
  try {
    saveToFile(submission);
    return { success: true };
  } catch (e) {
    console.error("File save error:", e);
    return { success: false, error: "Storage error" };
  }
}
