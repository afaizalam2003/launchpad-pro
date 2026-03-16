import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Github } from "lucide-react";

const codeLines = [
  { num: 1, content: 'import', highlight: false, rest: ' { createClient } ', keyword: 'from', end: " 'supabase'" },
  { num: 2, content: 'import', highlight: false, rest: ' { Razorpay } ', keyword: 'from', end: " 'launchkit/pay'" },
  { num: 3, content: '', highlight: false, rest: '', keyword: '', end: '' },
  { num: 4, content: 'const', highlight: true, rest: ' app = ', keyword: 'createApp', end: '({' },
  { num: 5, content: '  auth:', highlight: false, rest: ' ', keyword: 'true', end: ',' },
  { num: 6, content: '  payments:', highlight: false, rest: ' ', keyword: "'razorpay'", end: ',' },
  { num: 7, content: '  ai:', highlight: false, rest: ' ', keyword: 'true', end: ',' },
  { num: 8, content: '  database:', highlight: false, rest: ' ', keyword: "'supabase'", end: ',' },
  { num: 9, content: '})', highlight: false, rest: '', keyword: '', end: '' },
];

const Hero = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:gap-16">
          {/* Left content */}
          <div className="flex-1">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              Open Source · Free Forever
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Ship your SaaS in days.
            </h1>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-primary">
              Not months.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              The free, open-source alternative to ShipFast. Built for Indian developers with Razorpay + AI included.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="font-semibold text-base px-8" onClick={() => navigate("/signup")}>
                Get Started Free
              </Button>
              <a
                href="https://github.com/afaizalam2003/launchpad-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-card"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>✓ No credit card</span>
              <span>✓ MIT License</span>
              <span>✓ Razorpay included</span>
            </div>
          </div>

          {/* Code card */}
          <div className="mt-12 w-full max-w-md flex-shrink-0 lg:mt-0">
            <div className="rounded-xl border border-border bg-card p-1 shadow-2xl shadow-primary/5">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 rounded-t-lg bg-secondary/50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[hsl(45_93%_47%/0.7)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">launchkit.config.ts</span>
              </div>
              {/* Code */}
              <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
                {codeLines.map((l) => (
                  <div key={l.num} className="flex">
                    <span className="mr-4 w-5 select-none text-right text-muted-foreground/40">{l.num}</span>
                    {l.content ? (
                      <span>
                        <span className="text-primary">{l.content}</span>
                        <span className="text-foreground">{l.rest}</span>
                        {l.keyword && <span className="text-primary">{l.keyword}</span>}
                        <span className="text-muted-foreground">{l.end}</span>
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
