# Liftline

Software that **boosts influencer accounts** only works as a business if it does not fake the numbers.

Liftline is a small web app that:

- scores an Instagram, TikTok, YouTube, or X account from numbers you type in
- flags metrics that look purchased
- writes a 14-day posting plan for the niche
- prices a rate card a brand could believe
- explains the legal line so you do not build a bot shop by accident

It does **not** log into social apps, auto-like, auto-follow, or sell followers.

## The question this repo answers

**Is it possible?** Yes. Growth is mostly cadence, a repeatable series, replies, and a niche. Fake engagement is also “possible” until the platform deletes the account.

**Is it illegal?** Selling or buying fake followers, views, likes, or comments for a commercial purpose is an unfair practice under the US FTC’s [16 CFR 465.8](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465) (effective 21 October 2024). Civil penalties are assessed per violation. Bot farms that bypass access controls can also implicate the Computer Fraud and Abuse Act. Scheduling through official APIs, analytics, media kits, and authenticity checks are not.

**Can it make money?** The fake-metric stores already do, briefly, then they eat chargebacks and warning letters. Legal creator tools (Later, Buffer, Metricool) already bill $20–$110/mo. The open slice is a cheap studio for nano/micro creators and authenticity scoring for brands. Two hundred customers on a $19 plan is about $3,800 MRR — distribution is the hard part, not the dashboard.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. All scoring runs in the browser. No database and no social-network API keys.

## Disclaimer

This is not legal advice. If you are going to sell software in this category, read the FTC rule and talk to a lawyer before you take payment.
