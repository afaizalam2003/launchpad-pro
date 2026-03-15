import { Users, DollarSign, Zap, Crown, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { label: "Active Users", value: "2,847", trend: "+12.5%", up: true, icon: Users },
  { label: "MRR", value: "₹4,32,000", trend: "+8.2%", up: true, icon: DollarSign },
  { label: "API Calls", value: "1.2M", trend: "-3.1%", up: false, icon: Zap },
  { label: "Plan", value: "Pro", trend: "Active", up: true, icon: Crown },
];

const StatsCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card p-5 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <s.icon className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold font-['DM_Sans']">{s.value}</p>
          <div className="mt-1 flex items-center gap-1">
            {s.up ? (
              <TrendingUp className="h-3 w-3 text-primary" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span className={`text-xs font-medium ${s.up ? "text-primary" : "text-destructive"}`}>
              {s.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
