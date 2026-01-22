import { HeroSection } from "@/components/hero-section";
import { IntroSection } from "@/components/intro-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { FeaturedSection } from "@/components/featured-section";
import { GalleryPreview } from "@/components/gallery-preview";
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
      <GalleryPreview />
      <CollectionsSection />
      <TimelineSection />
      <Footer />
    </main>
  );
}
