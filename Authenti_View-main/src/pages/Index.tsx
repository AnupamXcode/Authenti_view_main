import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { DisclaimerSection } from "@/components/landing/DisclaimerSection";
import { Footer } from "@/components/landing/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ArchitectureSection />
        <DisclaimerSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
