import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePayment } from "@/hooks/usePayment";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  usePaymentHistory,
  formatPaymentDate,
  formatAmount,
} from "@/hooks/usePaymentHistory";
import { Skeleton } from "@/components/ui/skeleton";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    features: ["1 project", "100 API calls/day", "Community support"],
    amount: 0,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/mo",
    features: ["Unlimited projects", "10K API calls/day", "Priority support", "AI modules"],
    amount: 999,
  },
  {
    name: "Enterprise",
    price: "₹4,999",
    period: "/mo",
    features: ["Everything in Pro", "Unlimited API calls", "Dedicated support", "Custom SLA", "SSO"],
    amount: 4999,
  },
];

const Billing = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile(user?.id);
  const { payments, loading: paymentsLoading } = usePaymentHistory(user?.id);
  const {
    initiateProPayment,
    initiateEnterprisePayment,
    loading,
    error,
  } = usePayment();

  const currentPlan = (profile?.plan ?? "free").toLowerCase();

  const handleUpgrade = (planName: string) => {
    if (planName === "Pro") void initiateProPayment();
    else if (planName === "Enterprise") void initiateEnterprisePayment();
  };

  const isCurrentPlan = (planName: string) =>
    currentPlan === planName.toLowerCase();

  const isProOrEnterprise = currentPlan === "pro" || currentPlan === "enterprise";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="space-y-6 p-6 lg:p-8">
          {/* Payment success message */}
          {!error && loading && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
              Opening payment...
            </div>
          )}

          {/* Current Plan */}
          <div className="rounded-xl border border-primary/30 bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold font-['DM_Sans']">
                    {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isProOrEnterprise
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isProOrEnterprise ? "Active" : "Free"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isProOrEnterprise
                    ? "Next renewal: April 1, 2026"
                    : "Upgrade to unlock more features"}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                Manage Subscription
              </Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>API Usage</span>
                <span>—</span>
              </div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border bg-card p-6 ${
                  isCurrentPlan(p.name) ? "border-primary" : "border-border"
                }`}
              >
                <h3 className="text-lg font-semibold font-['DM_Sans']">
                  {p.name}
                </h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-5 w-full font-semibold"
                  variant={isCurrentPlan(p.name) ? "default" : "outline"}
                  disabled={isCurrentPlan(p.name) || p.name === "Free"}
                  onClick={() => p.name !== "Free" && handleUpgrade(p.name)}
                >
                  {isCurrentPlan(p.name) ? (
                    "Current Plan"
                  ) : p.name === "Free" ? (
                    "Free"
                  ) : loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Upgrade"
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Payment History */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold font-['DM_Sans']">
                Payment History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Invoice</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="px-5 py-3">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-5 py-3">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-5 py-3">
                          <Skeleton className="h-4 w-16" />
                        </td>
                        <td className="px-5 py-3">
                          <Skeleton className="h-5 w-14 rounded-full" />
                        </td>
                      </tr>
                    ))
                  ) : payments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-8 text-center text-sm text-muted-foreground"
                      >
                        No payment history yet
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30"
                      >
                        <td className="px-5 py-3 text-muted-foreground">
                          {formatPaymentDate(p.created_at)}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs">
                          #{p.invoice_id ?? "—"}
                        </td>
                        <td className="px-5 py-3 font-medium">
                          {formatAmount(p.amount)}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              p.status === "paid"
                                ? "bg-primary/10 text-primary"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Billing;
