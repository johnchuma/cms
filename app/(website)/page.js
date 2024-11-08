import FAQSection from "./components/faqSection";
import FeatureSection from "./components/featuresSection";
import GetStartedSection from "./components/getStartedSection";
import HeroSection from "./components/heroSection";
import PricingSection from "./components/pricingSection";
import ValuesSection from "./components/valuesSection";

const Page = () => {
  return (
    <div>
      <div className="min-h-screen w-screen bg-primary text-white pt-28 ">
        <HeroSection />
      </div>
      <FeatureSection />
      <ValuesSection />
      <PricingSection />
      <FAQSection />
      <GetStartedSection />
    </div>
  );
};

export default Page;
