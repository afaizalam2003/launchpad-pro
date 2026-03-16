import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DocsContent } from "@/components/docs/DocsContent";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <DocsContent />
      </div>
    </div>
  );
};

export default Docs;
