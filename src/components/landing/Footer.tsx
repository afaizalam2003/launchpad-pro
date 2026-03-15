const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Documentation", "Blog", "Tutorials", "Community"],
  Social: ["GitHub", "Twitter / X", "Discord", "YouTube"],
};

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30 py-16">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
      {/* Brand */}
      <div>
        <span className="flex items-center gap-1.5 text-lg font-bold">
          LaunchKit
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
        </span>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The open-source SaaS boilerplate for Indian developers.
        </p>
      </div>

      {Object.entries(footerLinks).map(([heading, links]) => (
        <div key={heading}>
          <h4 className="text-sm font-semibold">{heading}</h4>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mx-auto mt-14 max-w-6xl border-t border-border/50 px-4 pt-6 sm:px-6">
      <p className="text-center text-xs text-muted-foreground">
        Built by developers, for developers. © {new Date().getFullYear()} LaunchKit.
      </p>
    </div>
  </footer>
);

export default Footer;
