export const platforms = ["instagram", "tiktok", "youtube", "x"] as const;
export type Platform = (typeof platforms)[number];

export const niches = [
  "beauty",
  "fitness",
  "food",
  "finance",
  "tech",
  "fashion",
  "gaming",
  "education",
  "travel",
  "comedy",
] as const;
export type Niche = (typeof niches)[number];

export const goals = ["followers", "deals", "both"] as const;
export type Goal = (typeof goals)[number];

export const platformLabels: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
};

export const nicheLabels: Record<Niche, string> = {
  beauty: "Beauty",
  fitness: "Fitness",
  food: "Food",
  finance: "Personal finance",
  tech: "Tech",
  fashion: "Fashion",
  gaming: "Gaming",
  education: "Education",
  travel: "Travel",
  comedy: "Comedy",
};

export const goalLabels: Record<Goal, string> = {
  followers: "Grow the audience",
  deals: "Book brand deals",
  both: "Audience and deals",
};

export type AccountInput = {
  handle: string;
  platform: Platform;
  niche: Niche;
  followers: number;
  avgViews: number;
  avgLikes: number;
  avgComments: number;
  postsPerWeek: number;
  goal: Goal;
};

export type AccountTier = "nano" | "micro" | "mid" | "macro";

export type FlagSeverity = "ok" | "watch" | "danger";

export type Flag = {
  id: string;
  severity: FlagSeverity;
  title: string;
  detail: string;
};

export type RateCard = {
  dedicated: number;
  secondary: number;
  secondaryLabel: string;
  usage: number;
  package3: number;
  note: string;
};

export type CalendarPost = {
  day: number;
  title: string;
  format: string;
  why: string;
};

export type GrowthPlan = {
  input: AccountInput;
  generatedAt: string;
  handleLabel: string;
  tier: AccountTier;
  engagementRate: number;
  viewRate: number;
  commentRatio: number;
  benchmarkEngagement: number;
  healthScore: number;
  authenticityScore: number;
  flags: Flag[];
  verdict: "healthy" | "fixable" | "inflated";
  verdictSummary: string;
  rateCard: RateCard;
  cadence: string;
  series: { name: string; description: string };
  tactics: string[];
  avoid: string[];
  calendar: CalendarPost[];
  ninetyDay: {
    viewsLow: number;
    viewsHigh: number;
    dealLow: number;
    dealHigh: number;
    caveat: string;
  };
};
