import { MarketingNav } from "@/components/layout/marketing-nav";
import { Hero } from "@/components/marketing/hero";
import { StatTiles } from "@/components/marketing/stat-tiles";
import { ProblemSection } from "@/components/marketing/problem-section";
import { SolutionSection } from "@/components/marketing/solution-section";
import { ProcessFlow } from "@/components/marketing/process-flow";
import { CTAStrip } from "@/components/marketing/cta-strip";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <main>
        <Hero />
        <StatTiles />
        <ProblemSection />
        <SolutionSection />
        <ProcessFlow />
        <CTAStrip />
      </main>
      <Footer />
    </>
  );
}
