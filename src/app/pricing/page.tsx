"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePro } from "@/components/pro-provider";

export default function PricingPage() {
  const { isPro, unlock, lock } = usePro();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Pro</p>
        <h1 className="font-heading text-4xl text-balance">Sell the invoice, not another Insights clone</h1>
        <p className="mt-4 text-muted-foreground">
          Creators will not pay for graphs they screenshot from the app. They pay when a $400 offer
          becomes a $1,100 counter, or when a pitch is sitting in the clipboard. This checkout is a
          local demo — no card is charged.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Free</CardDescription>
            <CardTitle className="font-heading text-3xl">Kit check + one rate card</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>Authenticity flags a brand’s fraud tool would catch. The apps will not warn you first.</p>
            <p>One rate card: dedicated, usage, package.</p>
            <p>One brand category + one email/DM.</p>
            <p>Deal desk on a single offer (the conversion moment).</p>
            <p className="text-foreground">Not included: extra brand pitches, clean kit text, extra seats.</p>
          </CardContent>
          <CardFooter>
            <Button nativeButton={false} render={<Link href="/studio" />} variant="outline">
              Run a kit check
            </Button>
          </CardFooter>
        </Card>
        <Card className="ring-1 ring-primary/40">
          <CardHeader>
            <CardDescription>Studio Pro · $19/mo</CardDescription>
            <CardTitle className="font-heading text-3xl">The rest of the desk</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>Every brand category in the niche, with copy-ready email and DM.</p>
            <p>Kit text without a free-plan line — the file you actually send.</p>
            <p>Same deal desk, reused on every inbound offer that week.</p>
            <p>Still no Insights clone. Still no fake followers.</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            {isPro ? (
              <>
                <Button nativeButton={false} render={<Link href="/studio" />}>
                  Open the desk
                </Button>
                <Button variant="outline" onClick={lock}>
                  Turn Pro off
                </Button>
              </>
            ) : (
              <Button onClick={unlock}>Unlock Pro (demo)</Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <p className="text-sm text-muted-foreground">
        A later $49 desk plan is five creators for a manager. Not built here. The point is the
        packaging: pay for bookings, not for a prettier view count.
      </p>
    </main>
  );
}
