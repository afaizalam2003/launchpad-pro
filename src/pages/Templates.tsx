import { useState, useMemo, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TemplateCard from "@/components/dashboard/TemplateCard";
import TemplatePreviewModal from "@/components/dashboard/TemplatePreviewModal";
import { templates, type Template } from "@/data/templates";
import { useAuth } from "@/hooks/useAuth";
import { logTemplateDeploy } from "@/lib/activityLog";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["All", "SaaS", "Portfolio", "E-Commerce", "Restaurant", "Startup", "Blog"];

const Templates = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "All") return templates;
    return templates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const handlePreviewClick = (template: Template) => {
    setPreviewTemplate(template);
    setModalOpen(true);
  };

  const handleDeployClick = (template: Template) => {
    window.open(template.deployUrl, "_blank");
    void logTemplateDeploy(template.name, user?.email);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="space-y-6 p-6 lg:p-8">
          {/* Page header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Templates
              </h1>
              <p className="mt-1 text-primary">
                Free, open-source templates. Clone, customize, and ship. 🚀
              </p>
            </div>
            <div className="flex items-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {templates.length} Templates
              </span>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
              ✓ All Free
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
              ✓ Open Source
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
              ✓ One Click Deploy
            </span>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1 border-b border-border pb-2">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? templates.length : templates.filter((t) => t.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary underline decoration-primary underline-offset-4"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Templates grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[420px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onPreviewClick={handlePreviewClick}
                  onDeployClick={handleDeployClick}
                />
              ))}
            </div>
          )}

          {!loading && filteredTemplates.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No templates in this category.
            </p>
          )}
        </main>
      </div>

      <TemplatePreviewModal
        template={previewTemplate}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onDeployClick={handleDeployClick}
      />
    </div>
  );
};

export default Templates;
