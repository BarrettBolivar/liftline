import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg tracking-tight">
          Liftline
        </Link>
        <a
          href="#interest-email"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Get on the list
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>The number for the DM. Coming soon.</p>
        <p>Not Insights. Not fake followers.</p>
      </div>
    </footer>
  );
}
