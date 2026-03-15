import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="border-t border-border/50 py-24 md:py-32">
      <div className={`mx-auto max-w-3xl px-4 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to ship faster?</h2>
        <Button size="lg" className="mt-8 px-10 text-base font-semibold">
          Get Started Free
        </Button>
        <p className="mt-6 text-sm text-muted-foreground">
          MIT License · No vendor lock-in · Deploy in 5 minutes
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
