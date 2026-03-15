import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Price", lk: "Free", sf: "$199", ss: "$299" },
  { feature: "Razorpay", lk: true, sf: false, ss: false },
  { feature: "AI Built-in", lk: true, sf: false, ss: false },
  { feature: "Open Source", lk: true, sf: false, ss: false },
  { feature: "Next.js 14", lk: true, sf: true, ss: true },
  { feature: "Stripe", lk: true, sf: true, ss: true },
  { feature: "Supabase", lk: true, sf: true, ss: true },
];

const Cell = ({ value }: { value: boolean | string }) => {
  if (typeof value === "string") return <span>{value}</span>;
  return value ? <Check className="mx-auto h-5 w-5 text-primary" /> : <X className="mx-auto h-5 w-5 text-muted-foreground/40" />;
};

const Comparison = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className={`mx-auto max-w-4xl px-4 sm:px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          LaunchKit vs the rest
        </h2>
        <div className="mt-14 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-medium text-muted-foreground">Feature</th>
                <th className="bg-primary/10 p-4 text-center font-semibold text-primary">LaunchKit</th>
                <th className="p-4 text-center font-medium text-muted-foreground">ShipFast</th>
                <th className="p-4 text-center font-medium text-muted-foreground">Supastarter</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-b border-border/50 last:border-0">
                  <td className="p-4 font-medium">{r.feature}</td>
                  <td className="bg-primary/5 p-4 text-center"><Cell value={r.lk} /></td>
                  <td className="p-4 text-center"><Cell value={r.sf} /></td>
                  <td className="p-4 text-center"><Cell value={r.ss} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
