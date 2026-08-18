// src/components/layout/Sidebar.tsx
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Expenses", icon: Receipt, path: "/expenses" },
  { label: "Budgets", icon: Wallet, path: "/budgets" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-outline-soft bg-surface-low p-6 md:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container font-[Newsreader] text-lg font-medium text-on-primary-container">
          S
        </div>
        <div>
          <h1 className="font-[Newsreader] text-lg font-medium text-primary">
            Spendly
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-soft-gray">
            Personal Finance
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;

          return (
            <Link
              key={label}
              to={path}
              className={
                active
                  ? "flex items-center gap-3 rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary-container"
                  : "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-soft-gray transition hover:bg-surface-container hover:text-primary"
              }
            >
              <Icon className="h-4.5 w-4.5" h-={1.75} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" strokeWidth={2.25} />
          Add Expense
        </button>

        <div className="mt-3 flex flex-col gap-1 border-t border-outline-soft pt-3">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-soft-gray transition hover:bg-surface-container hover:text-primary"
          >
            <HelpCircle className="h-4.5 w-4.5" strokeWidth={1.75} />
            Help Center
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-soft-gray transition hover:bg-surface-container hover:text-primary"
          >
            <LogOut className="h-4.5 w-4.5" strokeWidth={1.75} />
            Log Out
          </a>
        </div>
      </div>
    </nav>
  );
};
