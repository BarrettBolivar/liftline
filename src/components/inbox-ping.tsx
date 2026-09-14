"use client";

import { useEffect } from "react";
import { clearPingCookie, pingInbox, readPingCookie } from "@/lib/ping-inbox";

export function InboxPing() {
  useEffect(() => {
    const email = readPingCookie();
    if (!email) return;
    clearPingCookie();
    pingInbox(email);
  }, []);

  return null;
}
