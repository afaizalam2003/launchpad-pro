import { useEffect } from "react";
import { Rocket, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Template } from "@/data/templates";

interface TemplatePreviewModalProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeployClick: (template: Template) => void;
}

const TemplatePreviewModal = ({
  template,
  open,
  onOpenChange,
  onDeployClick,
}: TemplatePreviewModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [open, onOpenChange]);

  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[95vh] max-w-[95vw] flex flex-col gap-0 border-border bg-background p-0"
        onPointerDownOutside={() => onOpenChange(false)}
      >
        <DialogHeader className="flex-shrink-0 border-b border-border px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            {template.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <iframe
            src={template.previewUrl}
            title={`Preview: ${template.name}`}
            className="h-[80vh] w-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        <DialogFooter className="flex-shrink-0 flex-row justify-end gap-2 border-t border-border px-6 py-4">
          <Button
            variant="outline"
            onClick={() => window.open(template.githubUrl, "_blank")}
          >
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              onDeployClick(template);
              onOpenChange(false);
            }}
          >
            <Rocket className="mr-2 h-4 w-4" />
            Deploy Free →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
