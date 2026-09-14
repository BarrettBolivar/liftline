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
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildPlan, samples } from "@/lib/engine";
import { compactNumber, money, percent } from "@/lib/format";
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
          <CardTitle>Account snapshot</CardTitle>
          <CardDescription>
            Use last month’s typical post, not the one viral clip. Nothing here logs into Instagram, TikTok, or YouTube.
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
              label="Followers / subs"
              value={form.followers}
              onChange={(followers) => setForm({ ...form, followers })}
            />
            <NumberField
              label="Avg views"
              value={form.avgViews}
              onChange={(avgViews) => setForm({ ...form, avgViews })}
            />
            <NumberField
              label="Avg likes"
              value={form.avgLikes}
              onChange={(avgLikes) => setForm({ ...form, avgLikes })}
            />
            <NumberField
              label="Avg comments"
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
            Build a legal growth plan
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
        <CardTitle>No plan yet</CardTitle>
        <CardDescription>
          Paste real averages from the last 8–12 posts. The studio will score health, flag numbers that look purchased, write a 14-day calendar, and price a rate card a brand could actually believe.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Try the sample accounts if you want to see a clean profile, a suspicious one, and a small channel that is under-posted.
      </CardContent>
    </Card>
  );
}

function Results({ plan }: { plan: GrowthPlan }) {
  const verdictStyle =
    plan.verdict === "inflated"
      ? "text-destructive"
      : plan.verdict === "fixable"
        ? "text-amber-600 dark:text-amber-400"
        : "text-emerald-700 dark:text-emerald-400";

  const kit = useMemo(() => mediaKitText(plan), [plan]);

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
          </div>
          <CardTitle className={verdictStyle}>
            {plan.verdict === "inflated"
              ? "These metrics look purchased"
              : plan.verdict === "fixable"
                ? "Real account, leaking reach"
                : "Numbers a brand can trust"}
          </CardTitle>
          <CardDescription>{plan.verdictSummary}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Progress value={plan.healthScore} className="sm:col-span-2">
            <ProgressLabel>Health</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={plan.authenticityScore}>
            <ProgressLabel>Authenticity</ProgressLabel>
            <ProgressValue />
          </Progress>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="Engagement" value={percent(plan.engagementRate)} hint={`Healthy band ~${percent(plan.benchmarkEngagement)}`} />
            <Stat label="Views / followers" value={percent(plan.viewRate, 0)} hint="TikTok often exceeds 100%" />
            <Stat label="Comments / likes" value={percent(plan.commentRatio)} hint="Real talk sits near 1–5%" />
            <Stat label="Cadence" value={`${plan.input.postsPerWeek}/wk`} hint={plan.cadence} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="flags">
        <TabsList className="h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="flags">Flags</TabsTrigger>
          <TabsTrigger value="plan">14-day plan</TabsTrigger>
          <TabsTrigger value="rates">Rate card</TabsTrigger>
          <TabsTrigger value="avoid">Illegal line</TabsTrigger>
        </TabsList>
        <TabsContent value="flags" className="grid gap-3 pt-3">
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
          <Card>
            <CardHeader>
              <CardTitle>Named series</CardTitle>
              <CardDescription>{plan.series.name}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{plan.series.description}</CardContent>
          </Card>
          <ul className="grid gap-2 text-sm">
            {plan.tactics.map((tactic) => (
              <li key={tactic} className="rounded-lg bg-muted/60 px-3 py-2">
                {tactic}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="plan" className="grid gap-3 pt-3">
          <p className="text-sm text-muted-foreground">{plan.cadence}</p>
          <div className="grid gap-2">
            {plan.calendar.map((post) => (
              <div
                key={post.day}
                className="grid gap-1 rounded-xl border border-border/80 px-3 py-3 sm:grid-cols-[3.5rem_1fr]"
              >
                <div className="font-heading text-lg text-muted-foreground">D{post.day}</div>
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.format} · {post.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rates" className="grid gap-3 pt-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Rate label="Dedicated post / video" value={money(plan.rateCard.dedicated)} />
            <Rate label={plan.rateCard.secondaryLabel} value={money(plan.rateCard.secondary)} />
            <Rate label="Whitelisting / usage (30 days)" value={money(plan.rateCard.usage)} />
            <Rate label="3-post package" value={money(plan.rateCard.package3)} />
          </div>
          <p className="text-sm text-muted-foreground">{plan.rateCard.note}</p>
          <p className="text-sm">
            If this cadence holds for 90 days, typical views land around {compactNumber(plan.ninetyDay.viewsLow)}–
            {compactNumber(plan.ninetyDay.viewsHigh)}. A believable deal range is {money(plan.ninetyDay.dealLow)}–
            {money(plan.ninetyDay.dealHigh)}. {plan.ninetyDay.caveat}
          </p>
          <Button variant="outline" onClick={downloadKit}>
            <Download data-icon="inline-start" />
            Download media kit text
          </Button>
        </TabsContent>
        <TabsContent value="avoid" className="grid gap-3 pt-3">
          <Alert>
            <AlertTriangle />
            <AlertTitle>The bot shop is not a gray area anymore</AlertTitle>
            <AlertDescription>
              Selling or buying fake followers, views, likes, or comments for a commercial purpose is an unfair
              practice under 16 CFR 465.8. Civil penalties are assessed per violation.{" "}
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

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg bg-muted/50 px-3 py-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-heading text-xl">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
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

function mediaKitText(plan: GrowthPlan): string {
  const { input, rateCard: card, handleLabel } = plan;
  return [
    `Media kit — @${handleLabel}`,
    `${platformLabels[input.platform]} · ${nicheLabels[input.niche]} · ${compactNumber(input.followers)} followers`,
    `Typical views ${compactNumber(input.avgViews)} · likes ${compactNumber(input.avgLikes)} · comments ${compactNumber(input.avgComments)}`,
    `Engagement ${percent(plan.engagementRate)} (band ~${percent(plan.benchmarkEngagement)})`,
    "",
    "Packages",
    `Dedicated: ${money(card.dedicated)}`,
    `${card.secondaryLabel}: ${money(card.secondary)}`,
    `Usage 30 days: ${money(card.usage)}`,
    `Three-post package: ${money(card.package3)}`,
    "",
    card.note,
    "",
    "Authenticity",
    plan.verdictSummary,
    "Liftline does not inflate metrics. Ask for a 12-post screenshot before you wire anything.",
  ].join("\n");
}
