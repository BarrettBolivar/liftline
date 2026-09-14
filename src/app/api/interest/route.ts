import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  EMAIL_RE,
  INTEREST_NOTIFY_EMAIL,
} from "@/lib/interest";

const LOG_PATH = path.join(process.cwd(), "data", "interest.json");

type Entry = { email: string; at: string };

export async function POST(request: Request) {
  let body: { email?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Need a real email." }, { status: 400 });
  }

  await appendLog({ email, at: new Date().toISOString() });
  return Response.json({ ok: true, notify: INTEREST_NOTIFY_EMAIL });
}

async function appendLog(entry: Entry) {
  try {
    await mkdir(path.dirname(LOG_PATH), { recursive: true });
    let existing: Entry[] = [];
    try {
      const raw = await readFile(LOG_PATH, "utf8");
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) existing = parsed as Entry[];
    } catch {
      existing = [];
    }
    existing.push(entry);
    await writeFile(LOG_PATH, JSON.stringify(existing, null, 2));
  } catch {
    // Hosts like Vercel are read-only outside /tmp. Email is the source of truth.
  }
}
