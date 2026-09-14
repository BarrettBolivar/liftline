import { money } from "@/lib/format";
import type { GrowthPlan, Niche, Platform } from "@/lib/types";
import { nicheLabels, platformLabels } from "@/lib/types";

export type BrandTarget = {
  type: string;
  why: string;
  offer: string;
};

export type Deliverable = "dedicated" | "secondary" | "usage" | "package3";

export const deliverableLabels: Record<Deliverable, string> = {
  dedicated: "Dedicated post / video",
  secondary: "Secondary placement",
  usage: "30-day usage / whitelisting",
  package3: "3-post package",
};

export type DealCall = "take" | "counter" | "walk" | "fix-first";

export type DealAdvice = {
  call: DealCall;
  headline: string;
  why: string;
  ask: number;
  floor: number;
  counterScript: string;
};

const brandsByNiche: Record<Niche, BrandTarget[]> = {
  beauty: [
    { type: "SPF / derm-adjacent", why: "You already film wear tests. They buy proof, not a bathroom haul.", offer: "One dedicated + 30-day usage on the wear-test" },
    { type: "Drugstore color", why: "Shade-match and dupe content is the catalog they cannot shoot in-house.", offer: "Three-post package, one shade each" },
    { type: "Hair care for wash day", why: "Routine series gives them a slot every week without a new concept.", offer: "Series integration, four weeks" },
  ],
  fitness: [
    { type: "Protein / simple food", why: "Your audience is bored of chicken. That is a product problem they can fund.", offer: "Dedicated recipe + affiliate code" },
    { type: "Home equipment", why: "Hotel-room sessions are the demo. Film in the actual space.", offer: "Dedicated + whitelisting the form clip" },
    { type: "Recovery / sleep", why: "You already said the PR died from sleep. That is the brief.", offer: "One explainer, usage 30 days" },
  ],
  food: [
    { type: "Store brand / grocer", why: "Cost-in-the-hook is their ad. Keep the real number on screen.", offer: "Three recipes, one banner" },
    { type: "Pantry sauce / spice", why: "One sauce, four dinners is a product story they did not have to invent.", offer: "Dedicated + usage" },
    { type: "Tools (pan, knife)", why: "Process shots beat a unboxing. They want the onion clip.", offer: "Integration, not a gifted haul" },
  ],
  finance: [
    { type: "High-yield cash / debit", why: "Paystub tours make the product obvious without a lecture.", offer: "Dedicated explainer, heavy disclaimer on screen" },
    { type: "Tax / bookkeeping app", why: "Freelance month-one is a search term they already buy ads against.", offer: "Tutorial + affiliate" },
    { type: "Insurance (boring, honest)", why: "Fear funnels convert worse with your audience. Sell the checklist.", offer: "One checklist video" },
  ],
  tech: [
    { type: "The gadget you retested", why: "Keep-or-sell is more trusted than launch-day dew.", offer: "Retest video + 30-day usage" },
    { type: "Privacy / password", why: "Deny-these-permissions is a setup they will pay to be in.", offer: "Dedicated walkthrough" },
    { type: "Home Wi-Fi", why: "Placement change is a $0 set. They still have a router to sell.", offer: "Before/after, usage on the clip" },
  ],
  fashion: [
    { type: "The blazer / one silhouette", why: "Three-day math beats a 14-item haul they cannot restock.", offer: "Outfit math, three posts" },
    { type: "Shoes with a step count", why: "8,000 steps is the review. Unboxing is not.", offer: "Dedicated wear test" },
    { type: "Alterations / tailor-friendly brand", why: "You already talk hem, waist, shoulder. That is the fit brief.", offer: "Fit check + usage" },
  ],
  gaming: [
    { type: "Peripherals at your actual FPS", why: "Settings on your hardware, not a sponsored battlestation.", offer: "Settings video + overlay usage" },
    { type: "The game’s publisher (patch week)", why: "Patch-not-trailer is the only clip worth paying for.", offer: "Patch recap, 48-hour window" },
    { type: "Chair / desk / accessibility", why: "Warm-up and accessibility settings are under-bought and loyal.", offer: "Dedicated + code" },
  ],
  education: [
    { type: "Study / notes app", why: "Findable notes is the product demo. Keep the file name on screen.", offer: "Tutorial + campus code" },
    { type: "Exam prep", why: "Decode-the-prompt is their landing page, filmed by a human.", offer: "Series of three questions" },
    { type: "Publishing / course", why: "Misconception you believed is the cold open for a class.", offer: "Dedicated + affiliate" },
  ],
  travel: [
    { type: "Transit / cards", why: "Not-the-$80-taxi is a conversion clip.", offer: "Arrival video + link" },
    { type: "One neighborhood hotel", why: "Bed, noise, outlet count is a review they can run as ads.", offer: "Stay + 30-day usage" },
    { type: "Maps / walking tour", why: "Copy-this-walk gets saves. That is the KPI.", offer: "Map video, no talking-head hotel lobby" },
  ],
  comedy: [
    { type: "App / consumer with a mundane pain", why: "Errand bits are cheaper than a celebrity sketch and they still ship product.", offer: "Character integration, two weeks" },
    { type: "Food delivery / landlord-adjacent", why: "Found voicemail energy. Keep it a bit, not an ad-read in the first second.", offer: "Dedicated bit + usage on the button" },
    { type: "Smaller tool (keyboard, snack, OTC)", why: "Callback character can hold a product without a haul.", offer: "Series cameo" },
  ],
};

const xBrandsByNiche: Record<Niche, BrandTarget[]> = {
  beauty: [
    { type: "Indie SPF / derm-twitter", why: "X buys arguments with sources, not bathroom lighting. A thread that shade-matches in daylight is the brief.", offer: "Dedicated thread + 24h reply window" },
    { type: "Retail / buyer media", why: "Buyers still lurk here. A three-post thread beats a haul they cannot stock.", offer: "3-thread package aimed at operators" },
    { type: "Ingredient / formulation", why: "Founders quote primary sources. You already talk niacinamide without a ring light.", offer: "Thread + quote-tweet the paper" },
  ],
  fitness: [
    { type: "Sports-science / wearable", why: "X is where the form-check argument happens in public. Hardware brands pay for that, not a hotel-room Reel.", offer: "Thread + reply window on the study" },
    { type: "Supplement that will show the COA", why: "If they want a gym-bro montage they are on the wrong site. Sell the label thread.", offer: "Dedicated thread, no montage" },
    { type: "Training software / logging", why: "People who log sets already live in replies. That is the demo.", offer: "Thread + 48h in the replies" },
  ],
  food: [
    { type: "CPG founder / grocer ops", why: "Cost-in-the-first-line is a thread, not a sound. Buyers screenshot that.", offer: "Dedicated thread with the actual receipt" },
    { type: "Restaurant tools", why: "Operators argue about tickets and labor here. A Reel does not enter that room.", offer: "Thread + reply window" },
    { type: "Commodity / spice brand", why: "One sauce, four dinners as a thread people bookmark. X Ads on it is extra.", offer: "Thread package, amplification quoted separate" },
  ],
  finance: [
    { type: "Brokerage / investing app", why: "Paystub and tax threads are already the native format. Put the disclaimer on screen one.", offer: "Dedicated thread, compliance pass, reply window" },
    { type: "B2B payments / payroll", why: "Founders buy in public here. A YouTube explainer is a different invoice.", offer: "Thread + 48h replies" },
    { type: "Insurance that will not do a fear funnel", why: "X punishes the fear thumbnail. Sell the checklist thread.", offer: "One checklist thread" },
  ],
  tech: [
    { type: "Developer tool / API", why: "Changelog and keep-or-sell threads are how this site works. X Ads on that post is a separate product.", offer: "Dedicated thread + reply window. Amplification extra." },
    { type: "B2B SaaS with a public roadmap", why: "They want the argument in replies, not a founder-on-a-stool video.", offer: "Thread series, three weeks" },
    { type: "Privacy / passkeys / security", why: "Deny-these-permissions is a thread people bookmark. Do not gift them Ads Manager.", offer: "Dedicated thread, 7-day X Ads quoted separate" },
  ],
  fashion: [
    { type: "D2C that will talk wholesale math", why: "Outfit math and alteration cost are threads. Hauls die here.", offer: "Dedicated thread + reply window" },
    { type: "Fabric / mill / workwear", why: "Operators and designers still lurk. Fit-from-the-side is a photo thread.", offer: "Photo thread, three looks" },
    { type: "Footwear with a step count", why: "8k steps is a review thread, not an unboxing. Quote-tweet the lab if they have one.", offer: "Wear-test thread" },
  ],
  gaming: [
    { type: "Studio community / patch notes", why: "Patch-not-trailer is native. They already have a Discord; they pay for the public thread.", offer: "Patch thread in the 48-hour window" },
    { type: "Peripherals at your actual FPS", why: "Settings on your hardware, posted as a thread, not a battlestation Reel.", offer: "Settings thread + reply window" },
    { type: "Anti-cheat / accessibility", why: "Underserved, loyal, and already arguing in replies.", offer: "Dedicated thread" },
  ],
  education: [
    { type: "Edtech selling to teachers / ops", why: "Decode-the-prompt is a thread. Campus TikTok is a different buyer.", offer: "Thread series of three questions" },
    { type: "Notes / research tool", why: "Findable notes with the file name in post one. Bookmark bait they can put Ads on — for a fee.", offer: "Tutorial thread, amplification extra" },
    { type: "Publisher / course", why: "The misconception you believed is a cold open that works in 12 posts.", offer: "Dedicated thread + replies" },
  ],
  travel: [
    { type: "Airline / loyalty / transit card", why: "Not-the-$80-taxi is a thread frequent flyers screenshot. X wants that spend in Ads.", offer: "Arrival thread + reply window" },
    { type: "Hotel that will talk noise and outlets", why: "Rebook-test threads convert operators and travelers. Reels convert neither here.", offer: "Stay thread" },
    { type: "Maps / local ops", why: "Copy-this-walk as a mapped thread. Saves are bookmarks.", offer: "Neighborhood thread" },
  ],
  comedy: [
    { type: "Consumer app with a mundane pain", why: "Errand bits as a thread plus a native video. Keep the product out of post one.", offer: "Character thread, two weeks" },
    { type: "Newsletter / media", why: "Callback character plus a link that is not the joke. X will not write this rate card.", offer: "Weekly thread + reply window" },
    { type: "Snack / OTC / tiny tool", why: "Cameo in the bit, not a haul. Quote-tweet the bit if they want reach — priced.", offer: "Series cameo + optional amplification" },
  ],
};

export function brandsFor(niche: Niche, platform?: Platform): BrandTarget[] {
  if (platform === "x") return xBrandsByNiche[niche];
  return brandsByNiche[niche];
}

export function deliverableLabelsFor(plan: GrowthPlan): Record<Deliverable, string> {
  if (plan.input.platform === "x") {
    return {
      dedicated: "Dedicated thread",
      secondary: plan.rateCard.secondaryLabel,
      usage: "X Ads on the thread (7 days)",
      package3: "3-thread package",
    };
  }
  return {
    dedicated: "Dedicated post / video",
    secondary: plan.rateCard.secondaryLabel,
    usage: "Whitelisting / usage (30 days)",
    package3: "3-post package",
  };
}

export function askFor(plan: GrowthPlan, deliverable: Deliverable): number {
  const card = plan.rateCard;
  if (deliverable === "secondary") return card.secondary;
  if (deliverable === "usage") return card.usage;
  if (deliverable === "package3") return card.package3;
  return card.dedicated;
}

export function evaluateDeal(plan: GrowthPlan, offer: number, deliverable: Deliverable): DealAdvice {
  const ask = askFor(plan, deliverable);
  const floor = Math.round(ask * 0.72);
  const labels = deliverableLabelsFor(plan);
  const label = labels[deliverable];
  const isX = plan.input.platform === "x";
  const kitNoun = isX ? "last 12 posts from Analytics" : "12-post screenshot";

  if (plan.verdict === "inflated") {
    return {
      call: "fix-first",
      headline: "Do not send a kit until the numbers are honest",
      why: `A brand that pays on fake reach can claw back the invoice and you still eat the FTC risk. Clean the ${kitNoun} first. Then quote the rate card.`,
      ask,
      floor,
      counterScript: `Thanks for thinking of @${plan.handleLabel}. I need to pass for now — my public metrics don't match the last 12 posts, and I won't sell a number I can't screenshot. Happy to reopen when the work is current.`,
    };
  }

  if (!Number.isFinite(offer) || offer <= 0) {
    return {
      call: "counter",
      headline: "Quote the card. Don't wait for them to invent a number.",
      why: isX
        ? "Blank offers on X usually mean they want a mention. Send the thread rate and the reply window. Do not gift Ads Manager."
        : "Blank offers are how creators get paid in ‘exposure.’ Send the dedicated rate and a 3-post package.",
      ask,
      floor,
      counterScript: isX
        ? `For a ${label.toLowerCase()} the rate is ${money(ask)}. Reply window is ${money(plan.rateCard.secondary)}. If you want X Ads on the thread, that's ${money(plan.rateCard.usage)} extra — I don't bundle it. Three threads is ${money(plan.rateCard.package3)}.`
        : `For a ${label.toLowerCase()} the rate is ${money(ask)}, usage extra. Package of three is ${money(plan.rateCard.package3)}. I can start next week if that works.`,
    };
  }

  if (offer < floor * 0.55) {
    return {
      call: "walk",
      headline: "That number is a hobby, not a booking",
      why: `Your floor on a ${label.toLowerCase()} is about ${money(floor)}. ${money(offer)} trains the next brand to lowball you.`,
      ask,
      floor,
      counterScript: `Appreciate the note — that's below what I can do for a ${label.toLowerCase()} (${money(ask)} dedicated, floor around ${money(floor)}). If budget moves, I have a week in the next 21 days.`,
    };
  }

  if (offer < floor) {
    return {
      call: "counter",
      headline: `Counter to ${money(ask)}, don't split the difference into the floor`,
      why: isX
        ? "Meeting in the middle of a lowball still underprices you. Quote the thread. If they cannot move, sell the reply window, not a single image post."
        : "Meeting in the middle of a lowball still underprices you. Quote the card. Offer a smaller deliverable if they cannot move.",
      ask,
      floor,
      counterScript: isX
        ? `I can do the ${label.toLowerCase()} at ${money(ask)}, or we shrink to a ${plan.rateCard.secondaryLabel.toLowerCase()} at ${money(plan.rateCard.secondary)}. Putting X Ads on it is ${money(plan.rateCard.usage)} extra. I can hold two dates next month.`
        : `I can do the ${label.toLowerCase()} at ${money(ask)}, or we shrink the scope to ${plan.rateCard.secondaryLabel.toLowerCase()} at ${money(plan.rateCard.secondary)}. Usage is ${money(plan.rateCard.usage)} extra. Dates I can hold: two options next month.`,
    };
  }

  if (offer < ask) {
    return {
      call: "counter",
      headline: isX
        ? "Close to the card — trade the reply window or drop amplification, don't just discount"
        : "Close to the card — trade usage or a second asset, don't just discount",
      why: isX
        ? "X wants the amplification inside Ads Manager for cheap. If they need a deal, shorten the reply window or drop the 7-day Ads line. Do not silently cut the thread rate."
        : "A 10–20% haircut is how rates die. If they need a deal, add a Story/Short or shorten usage, don't silently drop the number.",
      ask,
      floor,
      counterScript: isX
        ? `We're close. I can lock ${money(offer)} if we skip X Ads on the thread, or keep amplification at ${money(ask)} for the ${label.toLowerCase()}. Either works.`
        : `We're close. I can lock ${money(offer)} if usage is 14 days instead of 30, or keep 30-day usage at ${money(ask)}. Either works on my side.`,
    };
  }

  return {
    call: "take",
    headline: isX ? "Take it, then put Ads and the reply window in writing" : "Take it, then put the usage in writing",
    why: isX
      ? `${money(offer)} clears the ${money(ask)} card. Confirm the thread length, how long you live in replies, and whether they can run X Ads on it.`
      : `${money(offer)} clears the ${money(ask)} card for this deliverable. Confirm deliverables, posting window, and whether they can run ads on your face.`,
    ask,
    floor,
    counterScript: isX
      ? `Yes — ${money(offer)} for the ${label.toLowerCase()}, one round of notes, up within 7 days of brief. 24–48h reply window is ${money(plan.rateCard.secondary)}. X Ads on the thread is ${money(plan.rateCard.usage)} extra if you want it. I'll send the one-pager.`
      : `Yes — ${money(offer)} for the ${label.toLowerCase()}, one round of notes, post within 14 days of product landing. 30-day paid usage is ${money(plan.rateCard.usage)} extra if you want it. I'll send the one-pager.`,
  };
}

export function pitchEmail(plan: GrowthPlan, brand: BrandTarget): string {
  const { input, handleLabel, rateCard } = plan;
  const labels = deliverableLabelsFor(plan);
  if (input.platform === "x") {
    return `Subject: ${brand.type} × @${handleLabel} — ${brand.offer}

Hi —

I'm @${handleLabel} on X (${compactFollowers(input.followers)} followers, ${nicheLabels[input.niche]}). A typical post does about ${compactFollowers(input.avgViews)} impressions.

${brand.why}

What I'd make: ${brand.offer}.
${labels.dedicated}: ${money(rateCard.dedicated)}
${labels.secondary}: ${money(rateCard.secondary)}
${labels.usage}: ${money(rateCard.usage)}
${labels.package3}: ${money(rateCard.package3)}

I send a screenshot of the last 12 posts from Analytics so you're not buying a ratio from 2021. I don't sell fake followers, and I don't throw X Ads in for free.

If there's a brief in the next month, I can hold two dates.

— @${handleLabel}`;
  }
  return `Subject: ${brand.type} × @${handleLabel} — ${brand.offer}

Hi —

I'm @${handleLabel} (${compactFollowers(input.followers)} on ${platformLabels[input.platform]}, ${nicheLabels[input.niche]}). Typical post is doing ${compactFollowers(input.avgViews)} views.

${brand.why}

What I'd make: ${brand.offer}.
Dedicated is ${money(rateCard.dedicated)}. Three-post package is ${money(rateCard.package3)}. Usage / whitelisting is ${money(rateCard.usage)} for 30 days.

I send a 12-post screenshot with the kit so you're not buying a peak Reel. I don't sell fake followers.

If there's a brief in the next month, I can hold two dates.

— @${handleLabel}`;
}

export function pitchDm(plan: GrowthPlan, brand: BrandTarget): string {
  if (plan.input.platform === "x") {
    return `Hey — @${plan.handleLabel} on X, ${nicheLabels[plan.input.niche]}. ${brand.why} A dedicated thread is ${money(plan.rateCard.dedicated)}; X Ads on it is extra. I can send last-12 Analytics if useful.`;
  }
  return `Hey — @${plan.handleLabel}, ${nicheLabels[plan.input.niche]} on ${platformLabels[plan.input.platform]}. ${brand.why} Dedicated is ${money(plan.rateCard.dedicated)}. I can send the 12-post kit if useful.`;
}

function compactFollowers(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k`;
  return String(value);
}

export const FREE_PITCH_COUNT = 1;
export const PRO_PRICE = 19;
export const PRO_PRICE_LABEL = "$19/mo";
