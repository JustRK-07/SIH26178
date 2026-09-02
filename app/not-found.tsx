import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Footer } from "@/components/marketing/footer";

export default function NotFound() {
  return (
    <>
      <MarketingNav />
      <main className="mx-auto flex max-w-content flex-col items-start gap-4 px-6 py-24">
        <p className="text-caption uppercase tracking-wide text-ink-muted">404</p>
        <h1 className="text-display text-ink">Page not found.</h1>
        <p className="max-w-xl text-body text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="text-body text-brand hover:underline">
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
