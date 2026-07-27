
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FooterSection from "@/components/sections/FooterSection";
import HistoryCoffeeSection from "@/components/sections/HistoryCoffeeSection";
import InterviewSection from "@/components/sections/InterviewSection";
import GallerySection from "@/components/sections/GallerySection";
import NewsSection from "@/components/sections/NewsSection";
import CTASection  from "@/components/sections/CTASection";
import VarietasSection from "@/components/sections/VarietasSection";
import ProsesSection from "@/components/sections/ProsesSection";
import ProductSection from "@/components/sections/ProductSection";
import ProgramSection from "@/components/sections/ProgramSection";
import { Analytics } from '@vercel/analytics/next';
export default function Home() {



  return (
    <>
    <NavbarWrapper />
<HeroSection />
<AboutSection />
<InterviewSection />
<HistoryCoffeeSection />
<VarietasSection/>
<ProsesSection />
<ProductSection />
<ProgramSection />
<GallerySection />
<NewsSection />
<CTASection />
<FooterSection />

<Analytics />
</>
  );
}
