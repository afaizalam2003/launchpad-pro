import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder, PayTrack",
    quote: "LaunchKit saved me 3 weeks of setup. Razorpay integration worked out of the box.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Priya Sharma",
    role: "Full-stack Developer",
    quote: "Finally an open-source boilerplate that doesn't feel half-baked. The AI modules are incredible.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Vikram Rao",
    role: "CTO, NeoStack",
    quote: "We moved our entire starter template to LaunchKit. The DX is on par with Vercel's own tools.",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by developers
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-xl border border-border bg-card p-6 ${i === 1 ? "md:-translate-y-4" : ""}`}
            >
              <span className="text-4xl leading-none text-primary/60">"</span>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
