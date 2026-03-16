import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/dashboard/TemplateCard";
import TemplatePreviewModal from "@/components/dashboard/TemplatePreviewModal";
import { templates, type Template } from "@/data/templates";
import { useAuth } from "@/hooks/useAuth";
import { logTemplateDeploy } from "@/lib/activityLog";

const LANDING_TEMPLATES = templates.slice(0, 3);

const TemplatesSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { ref, isVisible } = useScrollAnimation();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePreviewClick = (template: Template) => {
    setPreviewTemplate(template);
    setModalOpen(true);
  };

  const handleDeployClick = (template: Template) => {
    window.open(template.deployUrl, "_blank");
    void logTemplateDeploy(template.name, user?.email);
  };

  const handleViewAll = () => {
    navigate("/dashboard/templates");
  };

  return (
    <section id="templates" ref={ref} className="py-24 md:py-32">
      <div
        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready-made templates
        </h2>
        <p className="mt-3 text-center text-primary">
          6 free templates to launch faster
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreviewClick={handlePreviewClick}
              onDeployClick={handleDeployClick}
              compact
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={handleViewAll}
          >
            View All 6 Templates →
          </Button>
        </div>
      </div>

      <TemplatePreviewModal
        template={previewTemplate}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onDeployClick={handleDeployClick}
      />
    </section>
  );
};

export default TemplatesSection;
