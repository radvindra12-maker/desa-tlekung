import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import HistoryCoffeeSection from "@/components/HistoryCoffeeSection";
import InterviewSection from "@/components/InterviewSection";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import CTASection  from "@/components/CTASection";
import { Analytics } from '@vercel/analytics/next';
export default function Home() {
  return (
    <>-
<HeroSection />
<AboutSection />
<HistoryCoffeeSection />
<InterviewSection />
<GallerySection />
<NewsSection />
<CTASection />
<Analytics />
<FooterSection />
 </>
  );
}