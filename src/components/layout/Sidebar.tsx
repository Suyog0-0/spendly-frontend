// src/components/layout/Sidebar.tsx
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  Settings,
  User,
  Plus,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Expenses", icon: Receipt, path: "/expenses" },
  { label: "Budgets", icon: Wallet, path: "/budgets" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    // Small delay so user sees the loading state
    await new Promise((r) => setTimeout(r, 600));
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-outline-soft bg-surface-low p-6 md:flex">
      <Link
        to="/profile"
        className="group mb-10 flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors hover:bg-surface-container"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container font-[Newsreader] text-lg font-medium text-on-primary-container transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
          S
        </div>
        <div>
          <h1 className="font-[Newsreader] text-lg font-medium text-primary transition-colors group-hover:text-primary-container">
            Spendly
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-soft-gray">
            Personal Finance
          </p>
        </div>
      </Link>

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
              <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => navigate("/expenses", { state: { addModalOpen: true } })}
          className="flex items-center justify-center gap-2 rounded-lg border border-primary/50 bg-transparent px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4" strokeWidth={2.25} />
          Add Expense
        </button>

        <div className="mt-3 flex flex-col gap-1 border-t border-outline-soft pt-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-soft-gray transition hover:bg-surface-container hover:text-primary disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" strokeWidth={1.75} />
            ) : (
              <LogOut className="h-4.5 w-4.5" strokeWidth={1.75} />
            )}
            {loggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </nav>
  );
};
