import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="flex items-center justify-center p-6 lg:p-8" style={{ minHeight: "calc(100vh - 4rem)" }}>
          <div className="text-center">
            <BookOpen className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold font-['DM_Sans']">Documentation coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">We're working on comprehensive guides and API references.</p>
            <Link to="/dashboard" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
