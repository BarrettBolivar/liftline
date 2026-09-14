import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  EMAIL_RE,
  INTEREST_NOTIFY_EMAIL,
} from "@/lib/interest";

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
    return bounceToInbox(email, homeUrl(request, "joined=1"));
  }

  return Response.json({ ok: true, notify: INTEREST_NOTIFY_EMAIL });
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
  return Response.redirect(homeUrl(request, query), 303);
}

function bounceToInbox(email: string, nextUrl: string) {
  const to = escapeHtml(INTEREST_NOTIFY_EMAIL);
  const safeEmail = escapeHtml(email);
  const safeNext = escapeHtml(nextUrl);
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sending…</title>
  </head>
  <body>
    <form id="notify" action="https://formsubmit.co/${to}" method="post">
      <input type="hidden" name="email" value="${safeEmail}" />
      <input type="hidden" name="_replyto" value="${safeEmail}" />
      <input type="hidden" name="_subject" value="Liftline interest" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="${safeNext}" />
      <input type="hidden" name="message" value="${safeEmail} wants to hear when Liftline is ready." />
      <noscript><button type="submit">Continue</button></noscript>
    </form>
    <script>document.getElementById("notify").submit();</script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
