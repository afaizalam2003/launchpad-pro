import { Users, DollarSign, Zap, Crown, LayoutTemplate, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Skeleton } from "@/components/ui/skeleton";

const StatsCards = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.id);
  const { activeUsers, mrr, apiCalls, templateDeploys, loading: statsLoading } = useDashboardStats();

  const plan = (profile?.plan ?? "free").toLowerCase();
  const isProOrEnterprise = plan === "pro" || plan === "enterprise";
  const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1);
  const planBadge = isProOrEnterprise ? "Active" : "Free";

  const isLoading = profileLoading || statsLoading;

  const formatMrr = (value: number | null): string => {
    if (value === null) return "—";
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const formatApiCalls = (value: number | null): string => {
    if (value === null) return "—";
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toString();
  };

  const cards = [
    {
      label: "Active Users",
      value: isLoading ? null : (activeUsers ?? 0).toLocaleString("en-IN"),
      trend: "—",
      up: true,
      icon: Users,
    },
    {
      label: "MRR",
      value: isLoading ? null : formatMrr(mrr),
      trend: "—",
      up: true,
      icon: DollarSign,
    },
    {
      label: "API Calls",
      value: isLoading ? null : formatApiCalls(apiCalls),
      trend: "—",
      up: true,
      icon: Zap,
    },
    {
      label: "Plan",
      value: profileLoading ? null : planDisplay,
      trend: planBadge,
      up: isProOrEnterprise,
      icon: Crown,
    },
    {
      label: "Templates Used",
      value: isLoading ? null : (templateDeploys ?? 0).toLocaleString("en-IN"),
      trend: (templateDeploys ?? 0) > 0 ? "deployed" : "—",
      up: (templateDeploys ?? 0) > 0,
      icon: LayoutTemplate,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card p-5 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <s.icon className="h-4 w-4 text-primary" />
          </div>
          {s.value === null ? (
            <Skeleton className="mt-2 h-8 w-20" />
          ) : (
            <p className="mt-2 text-2xl font-bold font-['DM_Sans']">{s.value}</p>
          )}
          <div className="mt-1 flex items-center gap-1">
            {s.label === "Templates Used" && s.trend === "—" ? (
              <Minus className="h-3 w-3 text-muted-foreground" />
            ) : s.up ? (
              <TrendingUp className="h-3 w-3 text-primary" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span
              className={`text-xs font-medium ${
                s.label === "Plan"
                  ? isProOrEnterprise
                    ? "text-primary"
                    : "text-muted-foreground"
                  : s.label === "Templates Used" && s.trend === "—"
                    ? "text-muted-foreground"
                    : s.up
                      ? "text-primary"
                      : "text-destructive"
              }`}
            >
              {s.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
