import { HeroSection } from "@/components/hero-section";
import { IntroSection } from "@/components/intro-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { FeaturedSection } from "@/components/featured-section";
import { GallerySection } from "@/components/gallery-section";
import { CollectionsSection } from "@/components/collections-section";
import { TimelineSection } from "@/components/timeline-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <PhilosophySection />
      <FeaturedSection />
      <GallerySection />
      <CollectionsSection />
      <TimelineSection />
      <Footer />
    </main>
  );
}
