"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INTEREST_NOTIFY_EMAIL } from "@/lib/interest";

type Status = "idle" | "loading" | "ok" | "fallback" | "error";

export function InterestForm({
  alreadyJoined = false,
  startError,
}: {
  alreadyJoined?: boolean;
  startError?: string;
}) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>(alreadyJoined ? "ok" : "idle");
  const [message, setMessage] = useState(startError ?? "");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const trimmed = email.trim().toLowerCase();

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: honeypot }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Could not send.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Try again in a minute.",
      );
      return;
    }

    const emailed = await pingInbox(trimmed);
    if (emailed) {
      setStatus("ok");
      setEmail("");
      return;
    }

    setStatus("fallback");
  }

  if (status === "ok") {
    return (
      <p
        className="max-w-md rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
        role="status"
      >
        You&apos;re on the list. We&apos;ll email you when Liftline is ready.
      </p>
    );
  }

  if (status === "fallback") {
    const mailto = `mailto:${INTEREST_NOTIFY_EMAIL}?subject=${encodeURIComponent("Liftline interest")}&body=${encodeURIComponent(`${email.trim().toLowerCase()} wants to hear when Liftline is ready.`)}`;
    return (
      <div className="max-w-md space-y-2 text-sm" role="status">
        <p className="text-foreground">
          One tap left — your mail app will send the ping. Nothing else to fill
          in.
        </p>
        <Button nativeButton={false} render={<a href={mailto} />} size="lg">
          Send the ping
        </Button>
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/interest"
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label htmlFor="interest-email" className="sr-only">
          Email
        </label>
        <Input
          id="interest-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 flex-1 px-3 text-base md:text-sm"
          aria-invalid={status === "error"}
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="h-11 shrink-0 px-5"
        >
          {status === "loading" ? "Sending…" : "I'm interested"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Email only. No account. We&apos;ll only use it to tell you when it&apos;s
        ready.
      </p>
      {status === "error" || (status === "idle" && startError) ? (
        <p className="text-sm text-destructive" role="alert">
          {message || startError}
        </p>
      ) : null}
    </form>
  );
}

async function pingInbox(email: string) {
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${INTEREST_NOTIFY_EMAIL}`,
      {
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
      },
    );
    if (!response.ok) return false;
    const payload = (await response.json()) as { success?: boolean | string };
    return payload.success === true || payload.success === "true";
  } catch {
    return false;
  }
}
