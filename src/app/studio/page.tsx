import { Studio } from "@/components/studio";

export default function StudioPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Studio</p>
        <h1 className="font-heading text-4xl">Paste a typical post. Get the number to send back.</h1>
        <p className="mt-3 text-muted-foreground">
          Use last month’s average, not the one viral clip. Then: the rate, a reply if they
          lowballed, and a check before you attach a screenshot.
        </p>
      </div>
      <Studio />
    </main>
  );
}
