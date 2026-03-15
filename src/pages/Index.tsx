import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogosStrip from "@/components/landing/LogosStrip";
import Features from "@/components/landing/Features";
import Comparison from "@/components/landing/Comparison";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <LogosStrip />
      <Features />
      <Comparison />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
