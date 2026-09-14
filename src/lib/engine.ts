import { calendarFor, seriesFor } from "@/lib/content";
import { clamp } from "@/lib/format";
import type {
  AccountInput,
  AccountTier,
  Flag,
  GrowthPlan,
  Platform,
  RateCard,
} from "@/lib/types";

export function tierFor(followers: number): AccountTier {
  if (followers < 10_000) return "nano";
  if (followers < 50_000) return "micro";
  if (followers < 250_000) return "mid";
  return "macro";
}

export function benchmarkEngagement(platform: Platform, tier: AccountTier): number {
  const table: Record<Platform, Record<AccountTier, number>> = {
    instagram: { nano: 4.2, micro: 2.8, mid: 1.6, macro: 1.1 },
    tiktok: { nano: 6.5, micro: 5.0, mid: 3.8, macro: 2.8 },
    youtube: { nano: 5.5, micro: 4.4, mid: 3.6, macro: 2.8 },
    x: { nano: 1.8, micro: 1.2, mid: 0.7, macro: 0.4 },
  };
  return table[platform][tier];
}

function engagementRate(input: AccountInput): number {
  const { platform, followers, avgViews, avgLikes, avgComments } = input;
  if (platform === "tiktok" || platform === "youtube") {
    if (avgViews <= 0) return 0;
    return ((avgLikes + avgComments) / avgViews) * 100;
  }
  if (followers <= 0) return 0;
  return ((avgLikes + avgComments) / followers) * 100;
}

function viewRate(input: AccountInput): number {
  if (input.followers <= 0) return 0;
  return (input.avgViews / input.followers) * 100;
}

function commentRatio(input: AccountInput): number {
  if (input.avgLikes <= 0) return 0;
  return (input.avgComments / input.avgLikes) * 100;
}

function cadenceTarget(platform: Platform, goal: AccountInput["goal"]): { min: number; max: number; copy: string } {
  if (platform === "youtube") {
    return {
      min: 1,
      max: 2,
      copy:
        goal === "deals"
          ? "One solid long-form video per week plus 3 Shorts cut from it. Brands buy the long-form audience, not a daily clip dump."
          : "1–2 long-form videos and 4–6 Shorts per week. Titles should be the search query, not a vibe.",
    };
  }
  if (platform === "x") {
    return {
      min: 5,
      max: 12,
      copy: "5–12 posts per week, mostly replies and native video. Follower-follow-unfollow loops get the account limited.",
    };
  }
  if (platform === "tiktok") {
    return {
      min: 5,
      max: 7,
      copy: "5–7 originals per week. Batch one afternoon. Posting 4 times a day from a bot is how people get labeled spam.",
    };
  }
  return {
    min: 4,
    max: 6,
    copy: "4–6 Reels per week, plus Stories that are actually from the day. Carousels once or twice for saves.",
  };
}

function rateCard(input: AccountInput, er: number, bench: number): RateCard {
  const quality = clamp(er / Math.max(bench, 0.4), 0.55, 1.45);
  const { platform, followers, avgViews } = input;
  let dedicated = 0;
  let secondary = 0;
  let secondaryLabel = "";
  let note = "";

  if (platform === "instagram") {
    dedicated = followers * 0.012 * quality;
    secondary = dedicated * 0.45;
    secondaryLabel = "Story set (3–5 frames)";
    note = "Brands still quote ‘$100 per 10k followers.’ Healthy engagement should push you above that; a dead audience should push you below it.";
  } else if (platform === "tiktok") {
    dedicated = Math.max(followers * 0.01, avgViews * 0.02) * quality;
    secondary = dedicated * 0.35;
    secondaryLabel = "Spark Ads / code usage";
    note = "TikTok rates track average views more than follower count. If views are fake, this number is fiction and a brand will notice in 48 hours.";
  } else if (platform === "youtube") {
    dedicated = Math.max(avgViews, followers * 0.08) * 0.028 * quality;
    secondary = dedicated * 0.22;
    secondaryLabel = "Dedicated Short";
    note = "Integrations price closer to a $20–$40 CPM on typical views. Shorts are add-ons, not the invoice.";
  } else {
    dedicated = followers * 0.006 * quality;
    secondary = dedicated * 0.5;
    secondaryLabel = "Thread + replies";
    note = "X pays less per follower. Sell a thread plus a reply window, not a single image post.";
  }

  const floor = followers < 3000 ? 50 : followers < 10_000 ? 75 : 100;
  dedicated = Math.max(dedicated, floor);
  secondary = Math.max(secondary, Math.round(floor * 0.4));
  const usage = dedicated * 1.6;
  const package3 = dedicated * 2.55;

  return { dedicated, secondary, secondaryLabel, usage, package3, note };
}

function flagsFor(input: AccountInput, er: number, views: number, comments: number, bench: number): Flag[] {
  const flags: Flag[] = [];
  const { followers, avgViews, avgLikes, avgComments, postsPerWeek, platform } = input;

  if (avgViews > 0 && avgLikes > avgViews) {
    flags.push({
      id: "likes-gt-views",
      severity: "danger",
      title: "Likes exceed views",
      detail:
        "That cannot happen on a real post. Either the numbers are mixed across posts, or someone sold you engagement. Do not send this screenshot to a brand.",
    });
  }

  if (followers >= 8000 && views < 5 && (platform === "tiktok" || platform === "instagram" || platform === "youtube")) {
    flags.push({
      id: "dead-reach",
      severity: "danger",
      title: "Reach does not match the follower count",
      detail:
        "A typical healthy account still puts 8–40% of followers (or more on TikTok) in front of a post. Numbers this low usually mean bought followers, a banned-for-spam history, or an audience that left.",
    });
  }

  if (avgLikes >= 150 && comments < 0.4) {
    flags.push({
      id: "comment-desert",
      severity: "danger",
      title: "Almost no comments relative to likes",
      detail:
        "Purchased likes rarely come with conversation. Real posts in your size band usually see comments at 1–5% of likes. Brands’ fraud tools look for this first.",
    });
  }

  if (er > bench * 4 && followers >= 15_000) {
    flags.push({
      id: "er-spike",
      severity: "danger",
      title: "Engagement is unrealistically high for this size",
      detail:
        "Pods, giveaway-for-follow loops, and bought likes all produce this shape. It looks impressive in a media kit and fails a screenshot test of the last 12 posts.",
    });
  }

  if (er > 0 && er < bench * 0.35 && followers >= 5000) {
    flags.push({
      id: "er-low",
      severity: "watch",
      title: "Engagement is well below the healthy band",
      detail:
        "This is fixable if the audience is real: tighter niche, better hooks, fewer posts that do not belong on the grid. It is not fixable with a follower pack.",
    });
  }

  if (postsPerWeek < 1) {
    flags.push({
      id: "ghost",
      severity: "watch",
      title: "The account is barely posting",
      detail:
        "Nothing else matters until there is a cadence. Algorithms cannot boost a profile that publishes twice a month.",
    });
  } else if (
    (platform === "tiktok" && postsPerWeek > 21) ||
    (platform === "instagram" && postsPerWeek > 14) ||
    (platform === "youtube" && postsPerWeek > 8)
  ) {
    flags.push({
      id: "spam-cadence",
      severity: "watch",
      title: "Volume looks like automation",
      detail:
        "Platforms already rate-limit repetitive posting. A scheduler through the official API is fine. A script hitting ‘share’ 12 times a day is how accounts get shadow-limited.",
    });
  }

  if (avgComments === 0 && avgLikes === 0 && avgViews === 0 && followers > 0) {
    flags.push({
      id: "no-activity",
      severity: "watch",
      title: "No recent performance numbers",
      detail: "Enter typical views, likes, and comments from the last 8–12 posts. The plan is only as honest as those inputs.",
    });
  }

  if (flags.length === 0) {
    flags.push({
      id: "clean",
      severity: "ok",
      title: "These numbers can be shown to a brand",
      detail:
        "Engagement sits in a believable band for this size. Keep screenshots of the last 12 posts. That is the media kit now — not a follower screenshot from 2019.",
    });
  }

  return flags;
}

function healthScore(input: AccountInput, er: number, bench: number, authenticity: number): number {
  const cadence = cadenceTarget(input.platform, input.goal);
  const cadenceScore =
    input.postsPerWeek <= 0
      ? 8
      : input.postsPerWeek < cadence.min
        ? 55
        : input.postsPerWeek > cadence.max * 1.8
          ? 62
          : 88;
  const erScore = clamp((er / bench) * 70, 8, 100);
  return Math.round(clamp(erScore * 0.4 + authenticity * 0.35 + cadenceScore * 0.25, 4, 98));
}

function authenticityScore(flags: Flag[]): number {
  if (flags.some((flag) => flag.severity === "danger")) return 28;
  if (flags.some((flag) => flag.id !== "clean" && flag.severity === "watch")) return 62;
  return 92;
}

function verdictFrom(flags: Flag[]): GrowthPlan["verdict"] {
  if (flags.some((flag) => flag.severity === "danger")) return "inflated";
  if (flags.some((flag) => flag.id !== "clean")) return "fixable";
  return "healthy";
}

function tacticsFor(input: AccountInput): string[] {
  const shared = [
    "Reply to comments for the first 90 minutes. That is distribution, not etiquette.",
    "Put the search phrase in the spoken first line and the on-screen text. Captions are not decoration.",
    "Keep a public folder of raw takes. Original footage beats a slideshow of other people’s clips.",
    "Collab with adjacent accounts at your size, not a celebrity duet fantasy. 8k × 8k still compounds.",
  ];
  if (input.platform === "youtube") {
    shared.push("Rewrite titles as the query you would type at 11pm. Thumbnail: one face, one object, no five fonts.");
  }
  if (input.platform === "tiktok") {
    shared.push("Stay on the post after you publish and talk to the first viewers. The app weights that session.");
  }
  if (input.platform === "instagram") {
    shared.push("Stories should add a day, not recycle the Reel. Polls and add-yours are cheap distribution if they are real.");
  }
  if (input.goal !== "followers") {
    shared.push("Media kit: 12-post screenshot, audience geo if you have it, three packages, and a usage-rights line. No fake follower count.");
  }
  return shared;
}

const avoid = [
  "Buying followers, likes, views, comments, or ‘active bots.’ US FTC rule 16 CFR 465.8 makes selling or buying fake influence indicators illegal for commercial use.",
  "Follow/unfollow, mass DMs, and engagement pods. Those are terms-of-service bans and they train a junk audience.",
  "Browser bots that log into Instagram, TikTok, or YouTube like a person. Official APIs exist for scheduling. Scrapers and login bots get accounts disabled and can cross into computer-access laws.",
  "Screenshotting a peak Reel as if it were average. Brands pull the last 12 posts themselves.",
];

function ninetyDay(
  input: AccountInput,
  verdict: GrowthPlan["verdict"],
  dedicated: number
) {
  const baseViews = Math.max(input.avgViews, input.followers * (input.platform === "tiktok" ? 0.4 : 0.12));
  const mult = verdict === "inflated" ? [0.7, 1.05] : verdict === "fixable" ? [1.25, 2.1] : [1.4, 2.4];
  return {
    viewsLow: Math.round(baseViews * mult[0]),
    viewsHigh: Math.round(baseViews * mult[1]),
    dealLow: Math.round(dedicated * (verdict === "inflated" ? 0.4 : 0.8)),
    dealHigh: Math.round(dedicated * (verdict === "inflated" ? 0.9 : 1.6)),
    caveat:
      verdict === "inflated"
        ? "If the current numbers are fake, the next 90 days will look like a crash. That is the real audience arriving. Do not buy a new pack to hide it."
        : "This is a range, not a promise. Series plus cadence plus replies move accounts. Nothing legal 10x’s a dead niche in a month.",
  };
}

export function buildPlan(input: AccountInput): GrowthPlan {
  const tier = tierFor(input.followers);
  const er = engagementRate(input);
  const views = viewRate(input);
  const comments = commentRatio(input);
  const bench = benchmarkEngagement(input.platform, tier);
  const flags = flagsFor(input, er, views, comments, bench);
  const authenticity = authenticityScore(flags);
  const verdict = verdictFrom(flags);
  const cadence = cadenceTarget(input.platform, input.goal);
  const handleLabel = input.handle.trim().replace(/^@/, "") || "your account";
  const card = rateCard(input, er, bench);

  return {
    input,
    generatedAt: new Date().toISOString(),
    handleLabel,
    tier,
    engagementRate: er,
    viewRate: views,
    commentRatio: comments,
    benchmarkEngagement: bench,
    healthScore: healthScore(input, er, bench, authenticity),
    authenticityScore: authenticity,
    flags,
    verdict,
    verdictSummary:
      verdict === "inflated"
        ? "Treat these metrics as toxic until proven otherwise. A brand deal sold on fake reach is the kind of commercial misrepresentation the FTC rule targets."
        : verdict === "fixable"
          ? "The account is real enough to grow. The bottleneck is craft and cadence, not a follower gap you can purchase."
          : "The account looks like a person making work. Protect that. A fake spike would be the fastest way to make it un-bookable.",
    rateCard: card,
    cadence: cadence.copy,
    series: seriesFor(input.niche),
    tactics: tacticsFor(input),
    avoid,
    calendar: calendarFor(input.niche, input.platform),
    ninetyDay: ninetyDay(input, verdict, card.dedicated),
  };
}

export const samples: Record<string, AccountInput> = {
  maya: {
    handle: "maya.skinlab",
    platform: "instagram",
    niche: "beauty",
    followers: 12400,
    avgViews: 9800,
    avgLikes: 410,
    avgComments: 28,
    postsPerWeek: 4,
    goal: "both",
  },
  jax: {
    handle: "jaxdrops",
    platform: "tiktok",
    niche: "gaming",
    followers: 84000,
    avgViews: 1200,
    avgLikes: 1900,
    avgComments: 2,
    postsPerWeek: 18,
    goal: "followers",
  },
  priya: {
    handle: "priyaexplains",
    platform: "youtube",
    niche: "education",
    followers: 3100,
    avgViews: 2400,
    avgLikes: 110,
    avgComments: 22,
    postsPerWeek: 1,
    goal: "deals",
  },
};
