import { INTEREST_NOTIFY_EMAIL } from "@/lib/interest";

const IFRAME_NAME = "liftline-notify";

export function pingInbox(email: string) {
  if (typeof document === "undefined" || !email) return;

  let iframe = document.querySelector<HTMLIFrameElement>(
    `iframe[name="${IFRAME_NAME}"]`,
  );
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = IFRAME_NAME;
    iframe.title = "Interest notify";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.method = "post";
  form.action = `https://formsubmit.co/${INTEREST_NOTIFY_EMAIL}`;
  form.target = IFRAME_NAME;
  form.style.display = "none";

  const fields: Record<string, string> = {
    email,
    _replyto: email,
    _subject: "Liftline interest",
    _template: "table",
    _captcha: "false",
    message: `${email} wants to hear when Liftline is ready.`,
  };

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  form.remove();
}

export function readPingCookie() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )liftline_ping=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export function clearPingCookie() {
  if (typeof document === "undefined") return;
  document.cookie = "liftline_ping=; Path=/; Max-Age=0; SameSite=Lax";
}
