import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, CreditCard, Sparkles, Database, Mail, GitBranch } from "lucide-react";

const features = [
  { icon: Shield, title: "Authentication", desc: "Email, Google, Magic Link — all pre-configured with Supabase Auth." },
  { icon: CreditCard, title: "Payments", desc: "Razorpay & Stripe integrated. Accept payments from day one." },
  { icon: Sparkles, title: "AI Ready", desc: "OpenAI SDK wired up with streaming, prompts, and rate limiting." },
  { icon: Database, title: "Database", desc: "Supabase Postgres with migrations, RLS, and type-safe queries." },
  { icon: Mail, title: "Transactional Email", desc: "Resend integration for welcome emails, receipts, and alerts." },
  { icon: GitBranch, title: "CI / CD", desc: "GitHub Actions pipeline with preview deployments on Vercel." },
];

const Features = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" ref={ref} className="py-16 md:py-20">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to launch
        </h2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)]"
            >
              <f.icon className="mb-4 h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
