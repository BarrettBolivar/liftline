import { InterestForm } from "@/components/interest-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({
  searchParams,
}: PageProps<"/">) {
  const params = await searchParams;
  const alreadyJoined = first(params.joined) === "1";
  const startError =
    first(params.error) === "email" ? "Need a real email." : undefined;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-12 sm:px-6 sm:py-20">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-medium tracking-wide text-primary uppercase">
          For the DM that just came in
        </p>
        <h1 className="font-heading text-4xl leading-tight text-balance sm:text-6xl">
          A brand DMs you. You don’t know what to charge.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
          Liftline is the 30 seconds between that message and your answer: the
          rate, the counter if they’re lowballing, and a warning if your own
          numbers would get you quietly dropped. Not another Insights clone. Not
          fake followers.
        </p>
        <div className="mt-8">
          <InterestForm alreadyJoined={alreadyJoined} startError={startError} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Without it</CardDescription>
            <CardTitle>You say yes to $400</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            It feels like a win. It trains every next brand to send $400. You
            still don’t know what you should have asked.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Without it</CardDescription>
            <CardTitle>You freeze and ghost them</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Guessing in the notes app at midnight. The brand moves on to someone
            who quoted a number in ten minutes.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Without it</CardDescription>
            <CardTitle>You send a follower screenshot</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            If the last twelve posts don’t match, they file you as junk and never
            say why. Liftline tells you before you hit send.
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>The number</CardTitle>
            <CardDescription>
              Dedicated, smaller placement, usage as its own line
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Priced off a typical post, not the one viral spike. On X that’s a
            thread, a reply window, and Ads — three invoices, not a mention.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>The reply</CardTitle>
            <CardDescription>Take, counter, or walk — already written</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Paste what they offered. Get a message you can send. Permission to
            walk is the part nobody else will give you.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>The kit check</CardTitle>
            <CardDescription>Before you attach the screenshot</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            If likes beat views, or 80k followers do 1,200 impressions, Liftline
            says do not send this. Brands’ fraud tools already know.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
