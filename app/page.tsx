import HeroSection from "@/components/HeroSection";
import PotensiSection from "@/components/PotensiSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import HistoryCoffeeSection from "@/components/HistoryCoffeeSection";
import InterviewSection from "@/components/InterviewSection";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import CTASection  from "@/components/CTASection";
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HistoryCoffeeSection />
      <InterviewSection />
      <PotensiSection />
      <GallerySection />
      <NewsSection />
      <CTASection />
       <FooterSection />
    </>
  );
}