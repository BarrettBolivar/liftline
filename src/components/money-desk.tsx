"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { usePro } from "@/components/pro-provider";
import { money } from "@/lib/format";
import {
  brandsFor,
  deliverableLabelsFor,
  evaluateDeal,
  FREE_PITCH_COUNT,
  pitchDm,
  pitchEmail,
  type Deliverable,
} from "@/lib/sell";
import type { GrowthPlan } from "@/lib/types";

function isDeliverable(value: unknown): value is Deliverable {
  return ["dedicated", "secondary", "usage", "package3"].includes(value as string);
}

export function MoneyDesk({ plan }: { plan: GrowthPlan }) {
  const { isPro, unlock } = usePro();
  const isX = plan.input.platform === "x";
  const labels = deliverableLabelsFor(plan);
  const deliverables = Object.keys(labels) as Deliverable[];
  const brands = brandsFor(plan.input.niche, plan.input.platform);
  const [deliverable, setDeliverable] = useState<Deliverable>("dedicated");
  const [offer, setOffer] = useState(() => Math.round(plan.rateCard.dedicated * 0.4));
  const [brandIndex, setBrandIndex] = useState(0);
  const advice = useMemo(
    () => evaluateDeal(plan, offer, deliverable),
    [plan, offer, deliverable]
  );
  const brand = brands[brandIndex] ?? brands[0];
  const email = pitchEmail(plan, brand);
  const dm = pitchDm(plan, brand);
  const lockedPitch = !isPro && brandIndex >= FREE_PITCH_COUNT;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Deal desk</CardTitle>
          <CardDescription>
            {isX
              ? "X will not tell you to walk. They want the spend in Ads Manager. Paste what the brand offered."
              : "TikTok will not tell you to walk. Instagram will not draft the counter. Paste what they offered."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Deliverable</Label>
              <Select
                value={deliverable}
                items={labels}
                onValueChange={(value) => {
                  if (isDeliverable(value)) setDeliverable(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {deliverables.map((item) => (
                    <SelectItem key={item} value={item}>
                      {labels[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="offer">Offer (USD)</Label>
              <Input
                id="offer"
                inputMode="numeric"
                value={String(offer)}
                onChange={(event) => {
                  const next = event.target.value.replace(/[^\d]/g, "");
                  setOffer(next === "" ? 0 : Number(next));
                }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-muted/60 px-4 py-3">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">{advice.call}</p>
            <p className="font-heading text-2xl">{advice.headline}</p>
            <p className="mt-2 text-sm text-muted-foreground">{advice.why}</p>
            <p className="mt-2 text-sm">
              Card {money(advice.ask)} · walk-away floor {money(advice.floor)}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label>Reply you can send</Label>
              <CopyButton text={advice.counterScript} />
            </div>
            <Textarea readOnly value={advice.counterScript} className="min-h-28" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brands that should pay for this series</CardTitle>
          <CardDescription>
            {plan.series.name}.{" "}
            {isX
              ? "Not a For You trend list — the category of advertiser that already buys threads in this plot."
              : "Not a trending-audio list — a category of advertiser who already buys this plot."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p className="text-sm text-muted-foreground">{plan.series.description}</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((item, index) => {
              const locked = !isPro && index >= FREE_PITCH_COUNT;
              return (
                <Button
                  key={item.type}
                  size="sm"
                  variant={brandIndex === index ? "default" : "outline"}
                  onClick={() => setBrandIndex(index)}
                >
                  {locked ? "Pro · " : ""}
                  {item.type}
                </Button>
              );
            })}
          </div>
          {lockedPitch ? (
            <div className="grid gap-3 rounded-xl border border-dashed px-4 py-6">
              <p className="font-medium">The other two pitches are Studio Pro</p>
              <p className="text-sm text-muted-foreground">
                Platforms already have Analytics. They will not email a brand for you, or price{" "}
                {isX ? "X Ads on your thread" : "30-day usage on your face"}. That is the paid product.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={unlock}>Unlock Pro (demo, no card)</Button>
                <Button nativeButton={false} render={<Link href="/pricing" />} variant="outline">
                  See what Pro is
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              <p className="text-sm">
                <span className="font-medium">{brand.type}.</span> {brand.why} Pitch: {brand.offer}.
              </p>
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Label>Email</Label>
                  <CopyButton text={email} label="Copy email" />
                </div>
                <Textarea readOnly value={email} className="min-h-48 font-mono text-xs" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Label>Short DM</Label>
                  <CopyButton text={dm} label="Copy DM" />
                </div>
                <Textarea readOnly value={dm} className="min-h-24" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
