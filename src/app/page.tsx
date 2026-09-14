import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-12 sm:px-6 sm:py-20">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-medium tracking-wide text-primary uppercase">
          Off-platform on purpose
        </p>
        <h1 className="font-heading text-4xl leading-tight text-balance sm:text-6xl">
          Instagram already told you the views. It will not tell you what to charge.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
          Insights, scheduling, trending audio, and “post more” live inside the apps. Duplicating
          that is a worse version of software creators already open for free. Liftline is the
          business the platforms will not run: the rate card, the walk-away number, and the email
          to a brand — without fake followers.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button nativeButton={false} render={<Link href="/studio" />} size="lg">
            Price the next deal
          </Button>
          <Button nativeButton={false} render={<Link href="/pricing" />} variant="outline" size="lg">
            What Pro sells
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leave this to the apps</CardTitle>
            <CardDescription>Free, native, and they will always be better at it</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Reach, watch time, audience age, best hours, suggested sounds, captions, native
            calendars, “your followers are waiting.” If a creator can see it in TikTok Analytics or
            YouTube Studio, we do not rebuild it.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This is the product</CardTitle>
            <CardDescription>Conflicts with what the apps want you to do</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            What a dedicated post should invoice. Whether $400 is a hobby. 30-day usage on your
            face as its own line. A pitch to a sunscreen brand, not another hook template. A warning
            when your own numbers would fail a brand’s fraud check — something the platform will
            only handle by silently limiting you.
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Rate card</CardTitle>
            <CardDescription>Not a follower screenshot</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Brands still lowball nano creators because the apps never publish a price. Dedicated,
            secondary, usage, and a three-post package — priced off typical posts, not the one viral
            spike.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Take / counter / walk</CardTitle>
            <CardDescription>The apps want you to say yes</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Spark Ads and branded content tools exist to make usage cheap. The desk tells you when
            the offer is below floor, drafts the reply, and tells you to fix fake-looking metrics
            before you send a kit.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>The email they will not write</CardTitle>
            <CardDescription>Discovery is not a booking</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Creator marketplaces keep the brand on-platform. Liftline writes the off-platform pitch:
            who should buy this series, the rate, and a 12-post screenshot promise — not a trending
            sound.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
