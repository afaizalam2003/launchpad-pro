import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Auth + Database", "1 project", "Community support", "MIT License"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    features: ["Everything in Free", "Unlimited projects", "Razorpay + Stripe", "AI modules", "Priority support"],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    features: ["Everything in Pro", "Custom integrations", "SLA guarantee", "Dedicated support", "Team management"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-32">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-xl border bg-card p-8 transition-all duration-300 ${
                p.highlight
                  ? "border-primary shadow-[0_0_40px_-12px_hsl(var(--primary)/0.25)]"
                  : "border-border hover:border-border/80"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full font-semibold ${!p.highlight ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""}`}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
