import { HeroSection, FeaturesSection, HowItWorksSection, StatsSection, CTASection } from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
