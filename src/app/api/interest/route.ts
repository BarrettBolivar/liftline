import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const NOTIFY_TO =
  process.env.INTEREST_NOTIFY_EMAIL ?? "barrettbolivar@protonmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  const notified = await notifyBarrett(email);
  if (!notified) {
    return Response.json(
      { error: "Could not send that. Try again in a minute." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

async function notifyBarrett(email: string) {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${NOTIFY_TO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        _replyto: email,
        _subject: "Liftline interest",
        _template: "table",
        _captcha: false,
        message: `${email} wants to hear when Liftline is ready.`,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
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
