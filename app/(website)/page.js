import FAQSection from "./components/faqSection";
import FeatureSection from "./components/featuresSection";
import HeroSection from "./components/heroSection";
import PricingSection from "./components/pricingSection";
import ValuesSection from "./components/valuesSection";
import AboutUs from "./components/aboutUs";

const Page = () => {
  return (
    <div>
      <div className=" h-auto pb-12   md:min-h-screen w-screen bg-primary text-white pt-28 ">
        <HeroSection />
      </div>
      <FeatureSection />
      <ValuesSection />
      <PricingSection />
      <FAQSection />
      <AboutUs />
    </div>
  );
};

export default Page;
