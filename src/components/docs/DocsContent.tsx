import { useRef } from "react";

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "authentication", label: "Authentication" },
  { id: "payments", label: "Payments" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "deployment", label: "Deployment" },
];

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-[hsl(0_0%_4%)] p-4 font-['JetBrains_Mono'] text-sm text-primary whitespace-pre">
    <code>{children}</code>
  </pre>
);

export const DocsContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex p-6 lg:p-8" style={{ minHeight: "calc(100vh - 4rem)" }}>
      {/* Left sidebar - sticky section links */}
      <aside className="sticky top-24 hidden h-fit w-56 shrink-0 lg:block">
        <nav className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div ref={contentRef} className="min-w-0 flex-1 pl-0 lg:pl-12">
        <div className="max-w-3xl space-y-16">
          {/* 1. GETTING STARTED */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold text-primary font-['DM_Sans']">
              Getting Started
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              LaunchKit is a React + Vite + TypeScript SaaS boilerplate with Supabase auth,
              payments, and AI built-in.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Quick Start
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Step 1:</strong> Clone and install dependencies
            </p>
            <CodeBlock>{`git clone https://github.com/afaizalam2003/launchpad-pro.git
cd launchpad-pro
npm install`}</CodeBlock>

            <p className="mt-6 text-sm text-muted-foreground">
              <strong>Step 2:</strong> Copy environment variables
            </p>
            <CodeBlock>{`cp .env.example .env
# Edit .env with your Supabase and API keys`}</CodeBlock>

            <p className="mt-6 text-sm text-muted-foreground">
              <strong>Step 3:</strong> Start the dev server
            </p>
            <CodeBlock>{`npm run dev`}</CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Installation
            </h3>
            <CodeBlock>{`npm install @supabase/supabase-js openai`}</CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Environment Setup
            </h3>
            <CodeBlock>{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GROQ_API_KEY=your_groq_api_key`}</CodeBlock>
          </section>

          {/* 2. AUTHENTICATION */}
          <section id="authentication">
            <h2 className="text-2xl font-bold text-primary font-['DM_Sans']">
              Authentication
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Auth is powered by Supabase. We use email/password by default.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              How Auth Works
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Supabase provides JWT-based auth. The <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">useAuth</code> hook
              fetches the session on mount and listens to <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">onAuthStateChange</code>.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Login / Signup Flow
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Login uses <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">signInWithPassword</code>.
              Signup uses <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">signUp</code> with optional user metadata (e.g. full_name).
            </p>
            <CodeBlock>{`await supabase.auth.signInWithPassword({ email, password });
await supabase.auth.signUp({ email, password, options: { data: { full_name } } });`}</CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Protected Routes
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Wrap dashboard routes with <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">ProtectedRoute</code>.
              Unauthenticated users are redirected to /login.
            </p>
            <CodeBlock>{`<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />`}</CodeBlock>
          </section>

          {/* 3. PAYMENTS */}
          <section id="payments">
            <h2 className="text-2xl font-bold text-primary font-['DM_Sans']">
              Payments
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              LaunchKit supports Stripe and Razorpay for Indian and global payments.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Stripe Setup
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get your keys from dashboard.stripe.com. Add to .env:
            </p>
            <CodeBlock>{`VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx`}</CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Razorpay Setup
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create an account at razorpay.com. Add to .env:
            </p>
            <CodeBlock>{`VITE_RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx`}</CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Webhook Configuration
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Configure webhooks in Stripe/Razorpay dashboards to point to your API endpoint.
              Verify signatures before processing events.
            </p>
            <CodeBlock>{`// Example: Verify Stripe webhook
const sig = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);`}</CodeBlock>
          </section>

          {/* 4. AI INTEGRATION */}
          <section id="ai-integration">
            <h2 className="text-2xl font-bold text-primary font-['DM_Sans']">
              AI Integration
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The AI Summarizer uses Groq (OpenAI-compatible API) with Llama 3.3 70B.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              How AI Summarizer Works
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              User pastes text → Groq API call with system prompt &quot;Summarize in 3-5 bullet points&quot;
              → Response displayed. Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">llama-3.3-70b-versatile</code>.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Custom AI Feature
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Replace the logic in <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">AISummarizer.tsx</code>.
              The client in <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">src/lib/openai.ts</code> is OpenAI-compatible — works with Groq, OpenAI, or any compatible provider.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Groq vs OpenAI
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Groq:</strong> Faster inference, free tier, Llama models. Set <code className="rounded bg-secondary px-1.5 py-0.5 text-primary font-['JetBrains_Mono'] text-xs">baseURL: &apos;https://api.groq.com/openai/v1&apos;</code>.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>OpenAI:</strong> GPT-4, broader model choice. Use default baseURL. Same API interface.
            </p>
            <CodeBlock>{`// Groq
const client = new OpenAI({ apiKey: GROQ_KEY, baseURL: 'https://api.groq.com/openai/v1' });

// OpenAI (default)
const client = new OpenAI({ apiKey: OPENAI_KEY });`}</CodeBlock>
          </section>

          {/* 5. DEPLOYMENT */}
          <section id="deployment">
            <h2 className="text-2xl font-bold text-primary font-['DM_Sans']">
              Deployment
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Deploy to Vercel in minutes. Build is static; no server needed for the frontend.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Vercel Deployment
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Step 1:</strong> Push to GitHub. <strong>Step 2:</strong> Import project in Vercel.
              <strong>Step 3:</strong> Add environment variables. <strong>Step 4:</strong> Deploy.
            </p>
            <CodeBlock>{`# Build command
npm run build

# Output directory
dist`}</CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-primary font-['DM_Sans']">
              Environment Variables
            </h3>
            <CodeBlock>{`VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GROQ_API_KEY=

# Optional (payments)
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_RAZORPAY_KEY_ID=`}</CodeBlock>
          </section>
        </div>
      </div>
    </main>
  );
};
