import { LayoutDashboard, CreditCard, Settings, BookOpen, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Docs", url: "/dashboard/docs", icon: BookOpen },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-[hsl(0_0%_6.7%)]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="text-xl font-bold tracking-tight font-['DM_Sans']">
          Launch<span className="text-primary">Kit</span>
        </span>
        <span className="h-2 w-2 rounded-full bg-primary" />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/dashboard"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-border px-3 py-4">
        <button
          onClick={() => navigate("/login")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
