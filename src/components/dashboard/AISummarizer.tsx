import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import groq from "@/lib/openai";

const AISummarizer = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!input.trim()) {
      setError("Please enter some text");
      return;
    }
    setError(null);
    setResult("");
    setLoading(true);
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Summarize the given text in 3-5 concise bullet points.",
          },
          { role: "user", content: input },
        ],
        max_tokens: 500,
      });
      const summary = completion.choices[0]?.message?.content ?? "";
      setResult(summary);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold font-['DM_Sans']">AI Summarizer</h3>
      </div>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        placeholder="Paste your text here to summarize..."
        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none font-['JetBrains_Mono']"
        rows={4}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <Button
        onClick={handleSummarize}
        disabled={loading}
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
