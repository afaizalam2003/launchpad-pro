import Navbar from "@/components/landing/Navbar";
import { DocsContent } from "@/components/docs/DocsContent";

const PublicDocs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <DocsContent />
      </div>
    </div>
  );
};

export default PublicDocs;
