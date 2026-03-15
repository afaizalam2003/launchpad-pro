

# LaunchKit — SaaS Landing Page

A premium, dark-themed landing page for "LaunchKit" — an open-source SaaS boilerplate for Indian developers. Design inspired by Raycast, Vercel, and Linear.

## Design System
- **Background**: Pure obsidian black (#0A0A0A), cards (#111111)
- **Accent**: Electric green (#22C55E) for CTAs and highlights
- **Muted**: Zinc (#71717A) for secondary text
- **Fonts**: DM Sans (headings), JetBrains Mono (code), imported via Google Fonts
- **Aesthetic**: Premium dev-tool feel, no purple/indigo/generic SaaS colors

## Sections (single-page, smooth scroll)

1. **Navbar** — Sticky with backdrop blur. Logo with green dot, center nav links, GitHub stars badge + green CTA. Mobile hamburger menu.

2. **Hero** — "Open Source · Free Forever" pill badge, bold H1 with green second line, subtitle mentioning Razorpay + AI, dual CTAs, 3 social proof pills, floating code editor card with syntax-highlighted Next.js/Supabase code, subtle grid background.

3. **Logos Strip** — "Built with the best tools" with muted white logos for Next.js, Supabase, Stripe, Razorpay, OpenAI, Vercel.

4. **Features Grid** — 6 dark cards (3×2) with green icons: Auth, Payments, AI Ready, Database, Email, CI/CD. Green border glow on hover.

5. **Comparison Table** — LaunchKit vs ShipFast vs Supastarter. Green-highlighted LaunchKit column with checkmarks, grey X for competitors.

6. **Pricing** — 3 dark cards: Free, Pro ($29/mo with green border + "Most Popular" badge), Enterprise ($99/mo). Feature lists with green checkmarks.

7. **Testimonials** — 3 staggered dark cards with avatars, names, roles, quotes, and green quote marks.

8. **Final CTA** — Full-width section with "Ready to ship faster?" heading and large green button, trust signals below.

9. **Footer** — 4-column layout with logo, product links, resources, social links.

## Interactions & Polish
- Scroll-triggered fade-in animations on every section using Intersection Observer
- Button hover states (green → lighter green)
- Fully mobile responsive with hamburger navigation
- Real-looking code editor in hero with line numbers and green syntax highlighting

