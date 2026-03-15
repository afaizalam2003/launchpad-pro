import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AISummarizer = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(
        "This text discusses the key benefits of using LaunchKit as a SaaS boilerplate, highlighting its pre-built authentication, Razorpay integration, and AI-ready modules that reduce development time from months to days."
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold font-['DM_Sans']">AI Summarizer</h3>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your text here to summarize..."
        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none font-['JetBrains_Mono']"
        rows={4}
      />
      <Button
        onClick={handleSummarize}
        disabled={loading || !input.trim()}
        className="mt-3 gap-2 font-semibold"
      >
        <Sparkles className="h-4 w-4" />
        {loading ? "Summarizing..." : "Summarize with AI"}
      </Button>
      {result && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm leading-relaxed text-foreground">{result}</p>
        </div>
      )}
    </div>
  );
};

export default AISummarizer;
