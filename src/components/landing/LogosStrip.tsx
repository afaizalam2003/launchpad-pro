import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const logos = ["Next.js", "Supabase", "Stripe", "Razorpay", "OpenAI", "Vercel"];

const LogosStrip = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`border-y border-border/50 py-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <p className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Built with the best tools
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((name) => (
            <span key={name} className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosStrip;
