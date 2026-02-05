import { HeroSection, FeaturesSection, HowItWorksSection, StatsSection, CTASection } from '@/components/sections';
import { Navbar } from '@/components/web3/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
      </main>
    </>
  );
}
