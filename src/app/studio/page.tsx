import { Studio } from "@/components/studio";

export default function StudioPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Studio</p>
        <h1 className="font-heading text-4xl">Grow the account you actually have</h1>
        <p className="mt-3 text-muted-foreground">
          Diagnostics, a named content series, fourteen posts, and a rate card. No login to the
          social apps. No bots. If the numbers look purchased, the studio says so.
        </p>
      </div>
      <Studio />
    </main>
  );
}
