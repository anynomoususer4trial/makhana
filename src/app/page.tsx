import FeaturedProduct from "@/components/ProductSection";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import BiharStory from "@/components/BiharStory";
import Testimonials from "@/components/Testimonials";
import OfferBanner from "@/components/OfferBanner";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
export default function Home() {
  return (
    <main>
      <Hero/>
      <WhyChoose/>
      <FeaturedProduct/>
      <BiharStory/>
      <Testimonials/>
      <OfferBanner/>
      <FAQ/>
      <CTA/>
    </main>
  );
}