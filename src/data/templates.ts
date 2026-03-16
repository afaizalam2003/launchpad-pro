export interface Template {
  id: number
  name: string
  category: string
  description: string
  tier: 'free'
  gradient: string
  techStack: string[]
  previewUrl: string
  githubUrl: string
  deployUrl: string
  features: string[]
}

export const templates: Template[] = [
  {
    id: 1,
    name: "SaaS Landing Pro",
    category: "SaaS",
    description: "Complete SaaS landing page with pricing, features, and testimonials",
    tier: "free",
    gradient: "from-green-900 to-black",
    techStack: ["React", "Tailwind", "TypeScript"],
    previewUrl: "https://saas-launchpad-pro-41.vercel.app/",
    githubUrl: "https://github.com/afaizalam2003/launchkit-saas-template",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/afaizalam2003/launchkit-saas-template",
    features: ["Hero + CTA", "Pricing cards", "Feature grid", "Testimonials", "FAQ", "Footer"]
  },
  {
    id: 2,
    name: "Developer Portfolio",
    category: "Portfolio",
    description: "Minimal dark portfolio for developers and designers",
    tier: "free",
    gradient: "from-blue-900 to-black",
    techStack: ["React", "Tailwind", "TypeScript"],
    previewUrl: "https://devfolio-template-two.vercel.app/",
    githubUrl: "https://github.com/afaizalam2003/launchkit-portfolio-template",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/afaizalam2003/launchkit-portfolio-template",
    features: ["About section", "Projects grid", "Skills", "Contact form", "Blog", "Dark mode"]
  },
  {
    id: 3,
    name: "E-Commerce Store",
    category: "E-Commerce",
    description: "Modern Indian online store with Razorpay checkout",
    tier: "free",
    gradient: "from-orange-900 to-black",
    techStack: ["React", "Tailwind", "Razorpay"],
    previewUrl: "https://shopkit-india.vercel.app/",
    githubUrl: "https://github.com/afaizalam2003/launchkit-ecommerce-template",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/afaizalam2003/launchkit-ecommerce-template",
    features: ["Product listings", "Shopping cart", "Razorpay checkout", "INR pricing", "Mobile first", "Order tracking"]
  },
  {
    id: 4,
    name: "Restaurant & Food",
    category: "Restaurant",
    description: "Beautiful restaurant website with menu and reservations",
    tier: "free",
    gradient: "from-yellow-900 to-black",
    techStack: ["React", "Tailwind", "TypeScript"],
    previewUrl: "https://dinekit-indian-restaurant-template.vercel.app/",
    githubUrl: "https://github.com/afaizalam2003/launchkit-restaurant-template",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/afaizalam2003/launchkit-restaurant-template",
    features: ["Menu display", "Online ordering", "Table booking", "Gallery", "Reviews", "Location map"]
  },
  {
    id: 5,
    name: "Startup Pitch",
    category: "Startup",
    description: "Investor-ready pitch page for your startup",
    tier: "free",
    gradient: "from-purple-900 to-black",
    techStack: ["React", "Tailwind", "TypeScript"],
    previewUrl: "https://pitchkit-startup-launchpad.vercel.app/",
    githubUrl: "https://github.com/afaizalam2003/launchkit-pitch-template",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/afaizalam2003/launchkit-pitch-template",
    features: ["Problem + Solution", "Market size", "Team section", "Traction metrics", "Roadmap", "Investor CTA"]
  },
  {
    id: 6,
    name: "Blog & Content",
    category: "Blog",
    description: "Clean blog with newsletter and article management",
    tier: "free",
    gradient: "from-pink-900 to-black",
    techStack: ["React", "Tailwind", "TypeScript"],
    previewUrl: "https://writekit-your-content-hub.vercel.app/",
    githubUrl: "https://github.com/afaizalam2003/launchkit-blog-template",
    deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/afaizalam2003/launchkit-blog-template",
    features: ["Article listing", "Newsletter signup", "Categories + tags", "Search", "Dark/Light mode", "Author profiles"]
  }
]
