import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, CreditCard, FileText, BarChart3, User, Wallet,
  ShieldCheck, Bell, Search, Settings, LogOut, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/loans/apply", label: "Apply for Loan", icon: FileText },
  { to: "/loans/tracking", label: "Loan Tracking", icon: BarChart3 },
  { to: "/payments", label: "Payments", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/admin", label: "Admin Console", icon: ShieldCheck },
] as const;

export function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-grad shadow-glow">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </span>
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Loan<span className="text-primary">Flow</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
            <Avatar className="h-9 w-9"><AvatarFallback className="bg-navy text-navy-foreground">RA</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Rohan Arora</p>
              <p className="truncate text-xs text-muted-foreground">Premium plan</p>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-8">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search loans, payments, customers..." className="h-10 pl-9" />
          </div>
          <button className="relative grid h-10 w-10 place-items-center rounded-md border border-border hover:bg-secondary">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <Badge variant="outline" className="hidden gap-1 border-success/30 bg-success/10 text-success md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> KYC verified
          </Badge>
          <button className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5 hover:bg-secondary">
            <Avatar className="h-7 w-7"><AvatarFallback className="bg-navy text-xs text-navy-foreground">RA</AvatarFallback></Avatar>
            <span className="hidden text-sm font-medium md:block">Rohan</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <Link to="/login" className="hidden text-muted-foreground hover:text-foreground md:block">
            <LogOut className="h-4 w-4" />
          </Link>
        </header>

        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const appNav = nav;
export const _ico = CreditCard;
