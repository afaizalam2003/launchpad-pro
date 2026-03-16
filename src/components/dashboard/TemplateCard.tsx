import { Eye, Github, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
  onPreviewClick: (template: Template) => void;
  onDeployClick: (template: Template) => void;
  compact?: boolean;
}

const TemplateCard = ({
  template,
  onPreviewClick,
  onDeployClick,
  compact = false,
}: TemplateCardProps) => {
  const visibleFeatures = template.features.slice(0, 3);
  const moreCount = template.features.length - 3;

  return (
    <div
      className="group cursor-pointer rounded-xl border border-border bg-[#111111] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_-8px_hsl(var(--primary)/0.4)]"
      role="article"
    >
      {/* TOP SECTION */}
      <div
        className={`relative overflow-hidden rounded-t-xl bg-gradient-to-br ${template.gradient} ${compact ? "h-32" : "h-[180px]"}`}
      >
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          Free
        </span>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-bold text-white drop-shadow-sm">
            {template.category}
          </span>
        </div>
        {/* Quick Preview overlay on hover */}
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onPreviewClick(template);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPreviewClick(template);
            }
          }}
        >
          <span className="flex items-center gap-2 rounded-lg bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground">
            <Eye className="h-4 w-4" />
            Quick Preview
          </span>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className={`space-y-3 ${compact ? "p-4" : "p-5"}`}>
        <div>
          <h3
            className={`font-bold text-white ${compact ? "text-base" : "text-lg"}`}
          >
            {template.name}
          </h3>
          <p
            className={`mt-1 line-clamp-2 text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}
          >
            {template.description}
          </p>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {template.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features list */}
        <ul className="space-y-1">
          {visibleFeatures.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span className="text-primary">✓</span>
              {f}
            </li>
          ))}
          {moreCount > 0 && (
            <li className="text-xs text-muted-foreground">
              + {moreCount} more
            </li>
          )}
        </ul>

        {/* BUTTONS ROW */}
        <div className="flex items-center gap-2 pt-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 flex-shrink-0 rounded-full border-border"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(template.githubUrl, "_blank");
                  }}
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">View Source</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Source</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="outline"
            className="flex-1 border-border"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPreviewClick(template);
            }}
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            Preview
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeployClick(template);
            }}
          >
            <Rocket className="mr-1.5 h-3.5 w-3.5" />
            Deploy Free →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
