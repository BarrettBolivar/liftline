import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { EMAIL_RE } from "@/lib/interest";

const LOG_PATH = path.join(process.cwd(), "data", "interest.json");

type Entry = { email: string; at: string };

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const isForm =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  const { email, website } = await readFields(request, isForm);

  if (website.trim() !== "") {
    return isForm ? redirectHome(request, "joined=1") : Response.json({ ok: true });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return isForm
      ? redirectHome(request, "error=email")
      : Response.json({ error: "Need a real email." }, { status: 400 });
  }

  await appendLog({ email, at: new Date().toISOString() });

  if (isForm) {
    return joinedRedirect(request, email);
  }

  return Response.json({ ok: true });
}

async function readFields(request: Request, isForm: boolean) {
  if (isForm) {
    const form = await request.formData();
    return {
      email: stringify(form.get("email")).trim().toLowerCase(),
      website: stringify(form.get("website")),
    };
  }

  try {
    const body = (await request.json()) as {
      email?: unknown;
      website?: unknown;
    };
    return {
      email: stringify(body.email).trim().toLowerCase(),
      website: stringify(body.website),
    };
  } catch {
    return { email: "", website: "" };
  }
}

function stringify(value: unknown) {
  return typeof value === "string" ? value : "";
}

function publicOrigin(request: Request) {
  const url = new URL(request.url);
  const hostHeader =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    url.host;
  const host = hostHeader.replace(/^0\.0\.0\.0/, "127.0.0.1");
  const proto =
    request.headers.get("x-forwarded-proto") ??
    url.protocol.replace(":", "") ??
    "http";
  return `${proto}://${host}`;
}

function homeUrl(request: Request, query: string) {
  return `${publicOrigin(request)}/?${query}`;
}

function redirectHome(request: Request, query: string) {
  return new Response(null, {
    status: 303,
    headers: { Location: homeUrl(request, query) },
  });
}

function joinedRedirect(request: Request, email: string) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: homeUrl(request, "joined=1"),
      "Set-Cookie": `liftline_ping=${encodeURIComponent(email)}; Path=/; Max-Age=120; SameSite=Lax`,
    },
  });
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
