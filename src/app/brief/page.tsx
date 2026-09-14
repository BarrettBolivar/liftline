"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currency } from "@/lib/format";

export default function BriefPage() {
  const [customers, setCustomers] = useState(250);
  const [price, setPrice] = useState(19);
  const mrr = useMemo(() => customers * price, [customers, price]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6">
      <header>
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Brief</p>
        <h1 className="font-heading text-4xl text-balance">Is influencer-boost software possible, legal, and profitable?</h1>
        <p className="mt-4 text-muted-foreground">
          Short answers: yes, only if you do not fake the metrics, and yes if you sell craft rather
          than counters. This is a product brief, not a law firm memo.
        </p>
      </header>

      <section className="grid gap-4">
        <h2 className="font-heading text-2xl">1. Possible</h2>
        <p className="text-muted-foreground">
          “Boost” usually means one of two products. The first is a bot farm: scripts that like,
          follow, view, and comment until the public numbers go up. That is technically possible
          for a few weeks until the platform deletes the account. The second is a growth system:
          better hooks, a named series, a posting cadence, comments answered while the post is
          still alive, collabs at your size, and a media kit that matches the last twelve posts.
          That second product is what Liftline runs in the studio.
        </p>
        <p className="text-muted-foreground">
          Platforms already publish official posting APIs. Scheduling through those APIs is allowed.
          Driving engagement by pretending to be thousands of people is not, even in the terms of
          service, and Instagram / TikTok / YouTube are good at noticing it.
        </p>
      </section>

      <section className="grid gap-4">
        <h2 className="font-heading text-2xl">2. Not illegal — the actual line</h2>
        <p className="text-muted-foreground">
          You asked for “not illegal,” not “blessed by Instagram.” The US line is clearer than the
          Discord screenshots suggest.
        </p>
        <ul className="grid gap-3 text-sm text-muted-foreground">
          <li className="rounded-xl bg-muted/50 px-4 py-3">
            <strong className="text-foreground">Fake metrics, sold or bought for business:</strong>{" "}
            16 CFR 465.8 makes it an unfair or deceptive practice to sell, distribute, purchase, or
            procure fake indicators of social media influence (followers, views, likes, comments,
            and the rest) that you knew or should have known were fake, when they can be used to
            misrepresent influence for a commercial purpose. The rule took effect 21 October 2024.
            The FTC has already sent warning letters. Knowing violations of a trade rule carry civil
            penalties on the order of $50,000+ per count.
          </li>
          <li className="rounded-xl bg-muted/50 px-4 py-3">
            <strong className="text-foreground">Bot farms that break into accounts or bypass
            access controls:</strong> that is not a terms-of-service slap. It can be a Computer
            Fraud and Abuse Act problem (18 U.S.C. § 1030).
          </li>
          <li className="rounded-xl bg-muted/50 px-4 py-3">
            <strong className="text-foreground">Still allowed:</strong> analytics on numbers the
            creator typed or exported, content calendars, rate-card math, authenticity scoring,
            scheduling through official APIs, and teaching people to reply to comments. Real people
            following an account because they were asked — including a shout-out from another
            creator — are not “fake indicators” under the FTC’s own Q&amp;A.
          </li>
          <li className="rounded-xl bg-muted/50 px-4 py-3">
            <strong className="text-foreground">Gray, and still a bad product:</strong> engagement
            pods of real humans, follow-for-follow, and giveaway-for-follow loops. The FTC declined
            to ban every incentivized follow, but platforms ban the automation around it, the
            audience quality is junk, and a brand that feels misled still has a deception theory.
          </li>
        </ul>
      </section>

      <section className="grid gap-4">
        <h2 className="font-heading text-2xl">3. Can it make money</h2>
        <p className="text-muted-foreground">
          Fake-engagement stores already exist. They also get Stripe-terminated, they refund when
          the followers evaporate, and they are now named in a federal rule. That is not a business
          you want to be in.
        </p>
        <p className="text-muted-foreground">
          Legal growth software is crowded at the top (Later’s influencer business has been
          compounding; Buffer charges about $25–$110/mo for scheduling). It is not crowded at the
          bottom: nano creators who need a rate card and a warning before they buy 5,000 followers
          from a Telegram bot. Brands will also pay to detect the fake ones. Fraud detection is
          listed as a growth driver in every influencer-platform report from 2025–2026.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Studio SaaS back-of-envelope</CardTitle>
            <CardDescription>
              Assume a $19 plan, 8% monthly churn after you have distribution, and no ads in this
              toy model. Drag the sliders.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="customers">Paying creators ({customers})</Label>
              <Input
                id="customers"
                type="range"
                min={25}
                max={2000}
                step={25}
                value={customers}
                onChange={(event) => setCustomers(Number(event.target.value))}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="price">Price per month (${price})</Label>
              <Input
                id="price"
                type="range"
                min={9}
                max={79}
                step={2}
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </div>
            <p className="font-heading text-4xl">{currency(mrr)} MRR</p>
            <p className="text-sm text-muted-foreground">
              {currency(mrr * 12)} if it held for a year. Getting to 250 paying creators is the whole
              job: distribution, not the React app. An agency plan at $49 for five seats is the
              obvious upsell. Selling the authenticity score to a CPG brand’s influencer team is
              the quieter six-figure path.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-3">
        <h2 className="font-heading text-2xl">4. What Liftline will not do</h2>
        <p className="text-muted-foreground">
          It will not log into anyone’s Instagram. It will not auto-like, auto-follow, or auto-view.
          It will not sell a follower pack. If you want that, you want a product the FTC has already
          described as illegal to commercialize.
        </p>
        <Button nativeButton={false} render={<Link href="/studio" />} size="lg" className="w-fit">
          Open the studio
        </Button>
      </section>
    </main>
  );
}
