import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tabs = ["Profile", "Security", "API Keys"] as const;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Profile");
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="p-6 lg:p-8">
          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-lg border border-border bg-card p-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Profile" && (
            <div className="max-w-lg space-y-5 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  FM
                </div>
                <div>
                  <p className="font-semibold font-['DM_Sans']">Faiz Memon</p>
                  <p className="text-sm text-muted-foreground">faiz@launchkit.dev</p>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input defaultValue="Faiz Memon" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <input defaultValue="faiz@launchkit.dev" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <Button className="font-semibold" onClick={() => toast({ title: "Changes saved" })}>
                Save Changes
              </Button>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="max-w-lg space-y-5 rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold font-['DM_Sans']">Change Password</h3>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <Button className="font-semibold">Update Password</Button>
            </div>
          )}

          {activeTab === "API Keys" && (
            <div className="max-w-lg space-y-5">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold font-['DM_Sans']">Live API Key</h3>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                  <code className="flex-1 font-mono text-sm text-muted-foreground">lk_live_••••••••••••1234</code>
                  <button onClick={() => toast({ title: "Copied to clipboard" })} className="text-muted-foreground transition-colors hover:text-foreground">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <Button variant="outline" className="mt-3 gap-2 border-border text-foreground hover:bg-secondary">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Regenerate Key
                </Button>
              </div>

              {/* Danger Zone */}
              <div className="rounded-xl border border-destructive/30 bg-card p-6">
                <h3 className="mb-2 font-semibold text-destructive font-['DM_Sans']">Danger Zone</h3>
                <p className="mb-4 text-sm text-muted-foreground">Once you delete your account, there is no going back.</p>
                <Button variant="outline" className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
