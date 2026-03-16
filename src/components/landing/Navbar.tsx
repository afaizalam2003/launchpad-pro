import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks: { label: string; href?: string; path?: string }[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", path: "/docs" },
  { label: "GitHub", href: "#github" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 text-lg font-bold text-foreground">
          LaunchKit
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
        </a>

        {/* Center links — desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) =>
            l.path ? (
              <Link
                key={l.label}
                to={l.path}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#github"
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Star className="h-3.5 w-3.5" />
            1.2k
          </a>
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Button size="sm" className="font-semibold" onClick={() => navigate("/signup")}>
            Get Started Free
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((l) =>
            l.path ? (
              <Link
                key={l.label}
                to={l.path}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Button size="sm" className="mt-2 w-full font-semibold" onClick={() => { setOpen(false); navigate("/signup"); }}>
            Get Started Free
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
