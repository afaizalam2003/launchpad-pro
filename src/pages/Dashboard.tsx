import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import AISummarizer from "@/components/dashboard/AISummarizer";
import RecentActivity from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="p-6 lg:p-8 space-y-6">
          <StatsCards />
          <div className="grid gap-6 lg:grid-cols-2">
            <AISummarizer />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
