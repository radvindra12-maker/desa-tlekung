
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import HistoryCoffeeSection from "@/components/HistoryCoffeeSection";
import InterviewSection from "@/components/InterviewSection";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import CTASection  from "@/components/CTASection";
import VarietasSection from "@/components/VarietasSection";
import ProsesSection from "@/components/ProsesSection";
import ProductSection from "@/components/ProductSection";
import { Analytics } from '@vercel/analytics/next';
export default function Home() {



  return (
    <>
<HeroSection />
<div className="website-bg">
<AboutSection />
<HistoryCoffeeSection />
<VarietasSection/>
<ProsesSection />
<ProductSection />
<InterviewSection />
<GallerySection />
<NewsSection />
<CTASection />
<FooterSection />
</div>
<Analytics />
 </>
  );
}