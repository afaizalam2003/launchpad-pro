import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    features: ["1 project", "100 API calls/day", "Community support"],
    current: false,
  },
  {
    name: "Pro",
    price: "₹2,400",
    period: "/mo",
    features: ["Unlimited projects", "10K API calls/day", "Priority support", "AI modules"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "₹8,200",
    period: "/mo",
    features: ["Everything in Pro", "Unlimited API calls", "Dedicated support", "Custom SLA", "SSO"],
    current: false,
  },
];

const payments = [
  { date: "Mar 1, 2026", amount: "₹2,400", status: "Paid", invoice: "#INV-0045" },
  { date: "Feb 1, 2026", amount: "₹2,400", status: "Paid", invoice: "#INV-0038" },
  { date: "Jan 1, 2026", amount: "₹2,400", status: "Paid", invoice: "#INV-0031" },
  { date: "Dec 1, 2025", amount: "₹2,400", status: "Paid", invoice: "#INV-0024" },
  { date: "Nov 1, 2025", amount: "₹2,400", status: "Refunded", invoice: "#INV-0017" },
];

const Billing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="space-y-6 p-6 lg:p-8">
          {/* Current Plan */}
          <div className="rounded-xl border border-primary/30 bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold font-['DM_Sans']">Pro Plan</h2>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Active</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Next renewal: April 1, 2026</p>
              </div>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Manage Subscription</Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>API Usage</span>
                <span>7,234 / 10,000</span>
              </div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "72%" }} />
              </div>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border bg-card p-6 ${p.current ? "border-primary" : "border-border"}`}
              >
                <h3 className="text-lg font-semibold font-['DM_Sans']">{p.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-5 w-full font-semibold ${p.current ? "" : ""}`}
                  variant={p.current ? "default" : "outline"}
                  disabled={p.current}
                >
                  {p.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>

          {/* Payment History */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold font-['DM_Sans']">Payment History</h3>
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
                  {payments.map((p) => (
                    <tr key={p.invoice} className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30">
                      <td className="px-5 py-3 text-muted-foreground">{p.date}</td>
                      <td className="px-5 py-3 font-mono text-xs">{p.invoice}</td>
                      <td className="px-5 py-3 font-medium">{p.amount}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === "Paid" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
