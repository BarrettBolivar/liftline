"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, CircleAlert, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoneyDesk } from "@/components/money-desk";
import { usePro } from "@/components/pro-provider";
import { buildPlan, samples } from "@/lib/engine";
import { compactNumber, money } from "@/lib/format";
import { deliverableLabelsFor } from "@/lib/sell";
import {
  goalLabels,
  goals,
  nicheLabels,
  niches,
  platformLabels,
  platforms,
  type AccountInput,
  type Goal,
  type GrowthPlan,
  type Niche,
  type Platform,
} from "@/lib/types";

const emptyForm: AccountInput = {
  handle: "",
  platform: "instagram",
  niche: "beauty",
  followers: 8000,
  avgViews: 3500,
  avgLikes: 220,
  avgComments: 18,
  postsPerWeek: 3,
  goal: "both",
};

function isPlatform(value: unknown): value is Platform {
  return platforms.includes(value as Platform);
}
function isNiche(value: unknown): value is Niche {
  return niches.includes(value as Niche);
}
function isGoal(value: unknown): value is Goal {
  return goals.includes(value as Goal);
}

export function Studio() {
  const [form, setForm] = useState<AccountInput>(emptyForm);
  const [plan, setPlan] = useState<GrowthPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(next = form) {
    if (next.followers < 0 || next.avgViews < 0 || next.avgLikes < 0 || next.avgComments < 0) {
      setError("Counts cannot be negative.");
      return;
    }
    if (next.followers === 0) {
      setError("Enter a follower or subscriber count so the benchmarks have something to compare.");
      return;
    }
    const built = buildPlan(next);
    setError(null);
    setPlan(built);
  }

  function loadSample(key: keyof typeof samples) {
    const sample = samples[key];
    setForm(sample);
    run(sample);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <Card className="h-fit lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle>Typical post, not Insights</CardTitle>
          <CardDescription>
            The apps already have the graphs. We need one honest average so the invoice is not a
            fantasy. Nothing here logs into Instagram, TikTok, YouTube, or X.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="Handle">
            <Input
              value={form.handle}
              placeholder="@you"
              onChange={(event) => setForm({ ...form, handle: event.target.value })}
            />
          </Field>
          <Field label="Platform">
            <Select
              value={form.platform}
              items={platformLabels}
              onValueChange={(value) => {
                if (isPlatform(value)) setForm({ ...form, platform: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platformLabels[platform]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Niche">
            <Select
              value={form.niche}
              items={nicheLabels}
              onValueChange={(value) => {
                if (isNiche(value)) setForm({ ...form, niche: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {niches.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {nicheLabels[niche]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={form.platform === "youtube" ? "Subscribers" : "Followers"}
              value={form.followers}
              onChange={(followers) => setForm({ ...form, followers })}
            />
            <NumberField
              label={form.platform === "x" ? "Avg impressions" : "Avg views"}
              value={form.avgViews}
              onChange={(avgViews) => setForm({ ...form, avgViews })}
            />
            <NumberField
              label="Avg likes"
              value={form.avgLikes}
              onChange={(avgLikes) => setForm({ ...form, avgLikes })}
            />
            <NumberField
              label={form.platform === "x" ? "Avg replies" : "Avg comments"}
              value={form.avgComments}
              onChange={(avgComments) => setForm({ ...form, avgComments })}
            />
          </div>
          <NumberField
            label="Posts per week"
            value={form.postsPerWeek}
            onChange={(postsPerWeek) => setForm({ ...form, postsPerWeek })}
          />
          <Field label="Goal">
            <Select
              value={form.goal}
              items={goalLabels}
              onValueChange={(value) => {
                if (isGoal(value)) setForm({ ...form, goal: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {goals.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goalLabels[goal]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {error ? (
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Check the numbers</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          <Button size="lg" className="w-full" onClick={() => run()}>
            Build the invoice
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => loadSample("maya")}>
              Maya, healthy IG
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadSample("jax")}>
              Jax, fake-looking TT
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadSample("priya")}>
              Priya, small YT
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadSample("devyn")}>
              Devyn, X tech
            </Button>
          </div>
        </CardContent>
      </Card>
      {plan ? <Results plan={plan} /> : <EmptyState />}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label}>
      <Input
        inputMode="numeric"
        value={Number.isFinite(value) ? String(value) : ""}
        onChange={(event) => {
          const next = event.target.value.replace(/[^\d]/g, "");
          onChange(next === "" ? 0 : Number(next));
        }}
      />
    </Field>
  );
}

function EmptyState() {
  return (
    <Card className="flex min-h-[28rem] flex-col justify-center border-dashed">
      <CardHeader>
        <CardTitle>No invoice yet</CardTitle>
        <CardDescription>
          Insights already counted the views. This studio prices the deal, flags numbers a brand’s
          fraud tool would bounce, and writes the email. Try a sample if you want a clean kit, a
          fake-looking one, or a small channel.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Try Maya (bookable), Jax (do not send that kit), Priya (small but honest), or Devyn (X thread).
      </CardContent>
    </Card>
  );
}

function Results({ plan }: { plan: GrowthPlan }) {
  const { isPro } = usePro();
  const labels = deliverableLabelsFor(plan);
  const isX = plan.input.platform === "x";
  const verdictStyle =
    plan.verdict === "inflated"
      ? "text-destructive"
      : plan.verdict === "fixable"
        ? "text-amber-600 dark:text-amber-400"
        : "text-emerald-700 dark:text-emerald-400";

  const kit = useMemo(() => mediaKitText(plan, isPro), [plan, isPro]);

  function downloadKit() {
    const blob = new Blob([kit], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${plan.handleLabel}-media-kit.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">@{plan.handleLabel}</Badge>
            <Badge variant="outline">{platformLabels[plan.input.platform]}</Badge>
            <Badge variant="outline">{plan.tier}</Badge>
            <Badge variant={plan.verdict === "inflated" ? "destructive" : "outline"}>
              {plan.verdict === "inflated"
                ? "Do not send this kit"
                : plan.verdict === "fixable"
                  ? "Kit is weak, still real"
                  : "Kit can go to a brand"}
            </Badge>
          </div>
          <CardTitle className={verdictStyle}>
            {plan.verdict === "inflated"
              ? "A brand fraud check would bounce this"
              : `Dedicated should invoice ${money(plan.rateCard.dedicated)}`}
          </CardTitle>
          <CardDescription>{plan.verdictSummary}</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="invoice">
        <TabsList className="h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="desk">Deal desk</TabsTrigger>
          <TabsTrigger value="kit">Kit check</TabsTrigger>
          <TabsTrigger value="line">Illegal line</TabsTrigger>
        </TabsList>
        <TabsContent value="invoice" className="grid gap-3 pt-3">
          <p className="text-sm text-muted-foreground">
            {isX
              ? "Follower count is not a price list. A thread, a reply window, and X Ads on that thread are three products. The site would rather you give the third one away."
              : "Follower count is not a price list. Usage (Spark Ads / whitelisting) is a separate product the apps would rather you give away."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Rate label={labels.dedicated} value={money(plan.rateCard.dedicated)} />
            <Rate label={labels.secondary} value={money(plan.rateCard.secondary)} />
            <Rate label={labels.usage} value={money(plan.rateCard.usage)} />
            <Rate label={labels.package3} value={money(plan.rateCard.package3)} />
          </div>
          <p className="text-sm text-muted-foreground">{plan.rateCard.note}</p>
          <p className="text-sm">
            Believable inbound range if the kit stays honest: {money(plan.ninetyDay.dealLow)}–
            {money(plan.ninetyDay.dealHigh)}. {plan.ninetyDay.caveat}
          </p>
          <Button variant="outline" onClick={downloadKit}>
            <Download data-icon="inline-start" />
            {isPro ? "Download kit" : "Download kit (free watermark)"}
          </Button>
        </TabsContent>
        <TabsContent value="desk" className="pt-3">
          <MoneyDesk key={plan.generatedAt} plan={plan} />
        </TabsContent>
        <TabsContent value="kit" className="grid gap-3 pt-3">
          <p className="text-sm text-muted-foreground">
            This is not another engagement graph. It is whether you should attach{" "}
            {isX ? "last-12 Analytics" : "a 12-post screenshot"} to a pitch — something the
            platform will never say out loud.
          </p>
          {plan.flags.map((flag) => (
            <Alert key={flag.id} variant={flag.severity === "danger" ? "destructive" : "default"}>
              {flag.severity === "danger" ? (
                <AlertTriangle />
              ) : flag.severity === "ok" ? (
                <CheckCircle2 />
              ) : (
                <CircleAlert />
              )}
              <AlertTitle>{flag.title}</AlertTitle>
              <AlertDescription>{flag.detail}</AlertDescription>
            </Alert>
          ))}
        </TabsContent>
        <TabsContent value="line" className="grid gap-3 pt-3">
          <Alert>
            <AlertTriangle />
            <AlertTitle>We do not sell the thing the apps already punish</AlertTitle>
            <AlertDescription>
              Fake followers, likes, views, or comments for a commercial purpose are an FTC issue
              under 16 CFR 465.8.{" "}
              <Link href="/brief" className="underline">
                Read the brief
              </Link>
              .
            </AlertDescription>
          </Alert>
          <ul className="grid gap-2 text-sm">
            {plan.avoid.map((item) => (
              <li key={item} className="rounded-lg bg-muted/60 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Rate({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="font-heading text-3xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function mediaKitText(plan: GrowthPlan, isPro: boolean): string {
  const { input, rateCard: card, handleLabel } = plan;
  const labels = deliverableLabelsFor(plan);
  const reach = input.platform === "x" ? "impressions" : "views";
  const lines = [
    `Media kit — @${handleLabel}`,
    `${platformLabels[input.platform]} · ${nicheLabels[input.niche]} · typical ${compactNumber(input.avgViews)} ${reach}`,
    `${labels.dedicated} ${money(card.dedicated)} · ${labels.secondary} ${money(card.secondary)} · ${labels.usage} ${money(card.usage)} · ${labels.package3} ${money(card.package3)}`,
    "",
    `Show: ${plan.series.name}`,
    plan.series.description,
    "",
    card.note,
    "",
    "Authenticity",
    plan.verdictSummary,
    input.platform === "x"
      ? "I send last-12 posts from Analytics. I do not sell fake followers, and I do not throw X Ads in for free."
      : "I send a 12-post screenshot. I do not sell fake followers.",
  ];
  if (!isPro) {
    lines.push("", "Prepared with Liftline Free — upgrade for a kit without this line.");
  }
  return lines.join("\n");
}
