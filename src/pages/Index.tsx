import SEO from "@/components/SEO";
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
      <SEO
        title="LaunchKit — Ship your SaaS in days, not months"
        description="Free open-source SaaS boilerplate for Indian developers. Auth, Stripe, Razorpay, AI, and more — all pre-built."
        keywords="saas boilerplate, nextjs starter, stripe razorpay, supabase auth, indian developers, shipfast alternative, open source"
      />
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
