import { Studio } from "@/components/studio";

export default function StudioPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Studio</p>
        <h1 className="font-heading text-4xl">Price the account. Do not re-graph it.</h1>
        <p className="mt-3 text-muted-foreground">
          Paste a typical post — not because we want another dashboard, but because a rate card
          without real averages is fiction. Then: invoice, take/counter/walk, and the pitch.
          Insights stay in the app where they belong.
        </p>
      </div>
      <Studio />
    </main>
  );
}
