# Liftline

A brand DMs you. You don’t know what to charge.

Liftline is the 30 seconds between that message and the reply: the rate, the counter, and a warning if the kit would get you dropped. This site is the waitlist.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Interest emails

The form asks for an email and nothing else. Visitors stay on Liftline and see “You’re on the list.” Their browser pings `barrettbolivar@protonmail.com` through [FormSubmit](https://formsubmit.co) in the background.

The first inbound email from FormSubmit is a confirmation. Click the link in that message or later sign-ups will not reach your inbox.

Override the destination with `NEXT_PUBLIC_INTEREST_EMAIL` if you need to.
