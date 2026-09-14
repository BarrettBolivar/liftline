import type { CalendarPost, Niche, Platform } from "@/lib/types";

type Series = { name: string; description: string };

const seriesByNiche: Record<Niche, Series> = {
  beauty: {
    name: "One product, three skins",
    description:
      "Same routine on oily, dry, and combination skin. Searchable, repeatable, and easy for brands to sponsor without looking like a dump of PR mail.",
  },
  fitness: {
    name: "12-minute hotel room",
    description:
      "A named workout that works in a small space. Viewers come back for the next session instead of a new random clip every day.",
  },
  food: {
    name: "$9 dinner that looks like $40",
    description:
      "Grocery-first recipes with a cost line in the first second. People save these, which is what the algorithm actually rewards.",
  },
  finance: {
    name: "Paycheck teardown",
    description:
      "One real number per episode: a bill, a tax, a 401(k) match. Education that does not pretend you are a hedge fund.",
  },
  tech: {
    name: "I was wrong about…",
    description:
      "Retest a tool you recommended last year. Builds trust, ranks for the product name, and gives you a reason to post weekly.",
  },
  fashion: {
    name: "Same outfit, three budgets",
    description:
      "One silhouette, three price ladders. Brands can buy a rung. Viewers stay for the comparison, not a haul.",
  },
  gaming: {
    name: "One mechanic until it clicks",
    description:
      "Teach a single movement, loadout, or puzzle. Better for search than another 14-second clutch with no caption.",
  },
  education: {
    name: "Explain it like I am late to class",
    description:
      "One misconception, one diagram, one recap. YouTube and TikTok both index this format when the title is the question people type.",
  },
  travel: {
    name: "24 hours, one neighborhood",
    description:
      "Tight geographic posts beat “10 days in Italy.” Local search, save-worthy maps, and hotels that will actually pay.",
  },
  comedy: {
    name: "The callback character",
    description:
      "One recurable bit with a visual tell. Comedy accounts stall when every post is a new persona; series characters compound.",
  },
};

const ideasByNiche: Record<Niche, string[]> = {
  beauty: [
    "Shade-match a drugstore foundation in daylight vs bathroom light",
    "The 4 products I stopped buying after my dermatologist visit",
    "Skin barrier repair: what I do the week after a peel",
    "Dupe vs original: texture, wear, and the one thing the dupe misses",
    "Get-ready with me for a 7am call, not a gala",
    "Ingredient decode: niacinamide on oily vs dry skin",
    "The makeup that survives a commute and a mask",
    "Empty: what I actually finished and would repurchase",
    "Hair wash day for people who skip day 2 dry shampoo theater",
    "A 3-step night routine if you only have nine minutes",
    "Color theory: undertone mistakes that make you look tired",
    "SPF that does not pill under the one concealer you already own",
    "What my face looks like 8 hours after the ‘12-hour wear’ claim",
    "Ask-me-anything from last week’s comments, answered on camera",
  ],
  fitness: [
    "Warm-up that is not jumping jacks: 90 seconds before a lift",
    "Form check: the squat cue that stopped my knees from caving",
    "Protein for people who are bored of chicken",
    "Walking pad vs outdoor walk: heart rate, not aesthetics",
    "A deload week that is not ‘I quit’",
    "Core work that does not wreck your lower back",
    "Gym anxiety script: first 20 minutes in a new room",
    "Sleep as training: the night that ruined yesterday’s PR",
    "Home session with a backpack if the gym is closed",
    "Why your step count lied last Tuesday",
    "Progress photo lighting: same time, same shirt, same wall",
    "Mobility for desk hips, filmed from the side so you can copy it",
    "The one accessory lift that fixed my bench stall",
    "Comment form checks from last week, with timestamps",
  ],
  food: [
    "Pantry pasta that uses one onion and no ‘secret restaurant trick’",
    "Grocery haul under a real number, not a sponsorship basket",
    "Knife skill: onions without the crying performance",
    "Meal prep that still tastes like food on Thursday",
    "The sauce I make once and eat four ways",
    "Breakfast if you leave the house in 12 minutes",
    "Why restaurant eggs taste different (heat, fat, salt — not magic)",
    "Bake that fails if you open the oven. Here is when to wait",
    "Leftover rice, made into something that is not fried-rice cliché",
    "Hosting for four without a grazing table",
    "Taste test: store brand vs name brand where it actually matters",
    "The spice you are underusing, in one pan",
    "How I plate for camera vs how I actually eat",
    "Reply to ‘that would never work with my picky kid’ with a variant",
  ],
  finance: [
    "Paystub tour: where the money went before it hit the checking account",
    "High-yield savings vs letting cash sit — with today’s actual APY caveat",
    "The subscription autopsy: 90 days of charges",
    "Tax withholding if you just went freelance",
    "Credit card float is not a personality. Here is the interest math",
    "401(k) match: the free money people skip in month two of a job",
    "Emergency fund that is not a round $10k fantasy",
    "Rent vs buy in one city, using conservative assumptions",
    "What I do the day a bill is wrong",
    "Index funds explained without a whiteboard TED impression",
    "Side income that is not dropshipping: hours in, dollars out",
    "Insurance you actually need at this age, not a fear funnel",
    "A money fight I had and the spreadsheet that ended it",
    "Questions from comments, with ‘I am not your advisor’ on screen",
  ],
  tech: [
    "I retested last year’s ‘must have’ gadget. Keep or sell",
    "Privacy settings I change the day I unbox a phone",
    "The cable, case, and charger that actually fail",
    "AI tool: one workflow, timed, not a feature tour",
    "Home Wi-Fi: the one placement change that cut dropouts",
    "Keyboard / mouse / chair — the setup that stopped my wrist pain",
    "Cloud photo mess: a 20-minute cull method",
    "Why this app wants every permission, and which ones I deny",
    "Laptop battery after 14 months, not launch-day brightness tests",
    "A free alternative that is 80% as good, with the 20% you lose",
    "Build a second brain you will still open in a month",
    "Smart home that is not a 14-hub shrine",
    "Security: passkeys, not a password lecture",
    "Comment request: ‘does this work with my weird printer’",
  ],
  fashion: [
    "Outfit math: one blazer, three days, no new haul",
    "Fit check from the side and the back — that is where clothes fail",
    "Thrift vs mall: the alteration cost people forget",
    "Shoe comfort after 8,000 steps, not the unboxing",
    "Color season without the TikTok quiz astrology",
    "What I wear to a wedding when I am not in the party",
    "Hem, waist, shoulder: the three tailoring fixes worth paying for",
    "Capsule that works in an office with a vague dress code",
    "Denim rise and why your ‘size’ moved",
    "Packing for four days in a personal item",
    "Jewelry that photographs vs jewelry that survives a commute",
    "Trend I sat out, and the silhouette I kept",
    "Care labels: the wash that killed a sweater",
    "Styling comments from last week, on a real body in daylight",
  ],
  gaming: [
    "One movement drill until the input is muscle memory",
    "Settings that reduced input lag on my actual hardware",
    "VOD review of my own throw, with the decision timestamp",
    "Budget peripherals vs the $200 version in the same fight",
    "New patch: what actually changed, not the trailer",
    "How I warm up in 6 minutes before ranked",
    "A puzzle / raid mechanic drawn on paper first",
    "Accessibility settings more people should copy",
    "Why I swapped mains and what I lost for two weeks",
    "Co-op etiquette that keeps randoms from leaving",
    "Story scene that works without spoilers — tone, not plot",
    "Controller vs keyboard for this one game, honestly",
    "A clip of a loss, because win montages do not teach",
    "Subscriber challenge from comments, with rules on screen",
  ],
  education: [
    "The misconception I believed until I had to teach it",
    "One diagram, drawn live, no jump cuts through the logic",
    "Exam question decoded: what the prompt is actually asking",
    "Study block: 25 minutes with the phone in another room",
    "Source vs summary: how I check a viral claim",
    "Vocabulary in context, not a list of 40 words",
    "History: one primary source, read out loud, then the textbook line",
    "Math: the unit you skip that makes chapter 7 impossible",
    "Language: 8 phrases I used this week, not a 1,000-word deck",
    "How I take notes I can find a month later",
    "A failure on camera: the problem I still cannot solve cleanly",
    "Career: what this degree maps to in job posts, not vibes",
    "Parent/teacher conference translation for a confused adult",
    "Q&A from last week, grouped by the same sticking point",
  ],
  travel: [
    "Airport to neighborhood without the $80 taxi default",
    "The museum if you only have 90 minutes",
    "Where I ate lunch that was not in a reel from 2022",
    "Packing cube: climate, not aesthetic flat-lay",
    "Transit pass vs ride-hail after 9pm",
    "Hotel room I would actually rebook: bed, noise, outlet count",
    "A walk with no destination, mapped so you can copy it",
    "Tipping, bathrooms, and the unglamorous rules of this city",
    "Day trip that is not the overcrowded one in every caption",
    "What I overpacked and mailed home",
    "Safety: the boring version, not a crime-doc intro",
    "Shoulder season: weather vs crowds vs price this month",
    "A neighborhood at 7am vs 7pm",
    "Comment: ‘is this still true after the strike / season / renovation’",
  ],
  comedy: [
    "The character walks into a place that hates them",
    "Voiceover on a mundane errand that should not be this hard",
    "Callback to last week’s bit in the first second",
    "Two-character argument about a tiny household object",
    "I lip-sync the voicemail my landlord actually left",
    "A rule I invented and now have to live with",
    "Crowd-work style, but the crowd is one exhausted roommate",
    "Green-screen that is deliberately cheap on purpose",
    "The ‘expert’ who is wrong with confidence",
    "Pet / kid / partner reacts, unprompted — stop if they hate it",
    "A joke that failed, annotated",
    "Duet with a stranger’s boring clip, not a bigger creator’s",
    "End on the button, not a follow-for-part-two hostage",
    "Read the meanest comment in character, then drop character",
  ],
};

const formats: Record<Platform, string[]> = {
  instagram: [
    "Reel, 12–18s, text on screen",
    "Reel, 25–35s, voiceover",
    "Carousel, 7 slides",
    "Reel with a save prompt on the last frame",
  ],
  tiktok: [
    "Vertical, 12s, hook in 1s",
    "Vertical, 35s, tutorial",
    "Photo mode with on-screen steps",
    "Reply-to-comment video",
  ],
  youtube: [
    "Long-form chapter, 8–12 min",
    "Short, 20–40s",
    "Community post + Short pair",
    "Long-form with a recap card",
  ],
  x: [
    "Post + 4-frame media",
    "Short clip native video",
    "Thread, 6 posts",
    "Reply-first post on a trending claim",
  ],
};

export function seriesFor(niche: Niche): Series {
  return seriesByNiche[niche];
}

export function calendarFor(niche: Niche, platform: Platform): CalendarPost[] {
  const ideas = ideasByNiche[niche];
  const shapes = formats[platform];
  return ideas.slice(0, 14).map((title, index) => ({
    day: index + 1,
    title,
    format: shapes[index % shapes.length],
    why:
      index % 5 === 0
        ? "Search and save. Put the query in the first line of the caption."
        : index % 5 === 1
          ? "Series episode. Same intro frame so people recognize the show."
          : index % 5 === 2
            ? "Proof and process. Algorithms can detect original footage; use it."
            : index % 5 === 3
              ? "Conversation bait. Reply to every comment for 90 minutes after posting."
              : "Distribution. Recut the best-performing beat from earlier in the week.",
  }));
}
