// src/components/layout/TopBar.tsx
import { Bell, Sun, Moon, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect } from "react";
import { getExpenses } from "@/lib/api";

export const TopBar = ({ title }: { title: string }) => {
  const { user } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [overBudgetCategories, setOverBudgetCategories] = useState<{category: string, budget: number, spent: number}[]>([]);
  const [isLight, setIsLight] = useState(document.body.classList.contains("light"));

  const toggleTheme = () => {
    document.body.classList.toggle("light");
    setIsLight(document.body.classList.contains("light"));
  };

  useEffect(() => {
    const fetchOverBudget = async () => {
      const budgetsRaw = localStorage.getItem("spendly_budgets");
      const budgets: Record<string, number> = budgetsRaw ? JSON.parse(budgetsRaw) : {};
      try {
        const expenses = await getExpenses();
        const spent: Record<string, number> = {};
        expenses.forEach((e) => {
          spent[e.category] = (spent[e.category] || 0) + e.amount;
        });
        const over = Object.keys(budgets)
          .filter((cat) => spent[cat] && spent[cat] > budgets[cat])
          .map((cat) => ({
            category: cat,
            budget: budgets[cat],
            spent: spent[cat]
          }));
        setOverBudgetCategories(over);
      } catch {
        // ignore
      }
    };
    fetchOverBudget();
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-soft bg-surface/80 px-6 backdrop-blur-md md:w-[calc(100%-16rem)]">
      <h2 className="font-[Newsreader] text-xl font-medium text-on-surface">{title}</h2>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="text-soft-gray transition hover:text-primary"
        >
          {isLight ? (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          ) : (
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
          )}
        </button>

        <div className="h-6 w-px bg-outline-soft" />

        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-soft-gray transition hover:text-primary"
            onClick={() => setShowNotif(!showNotif)}
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
            {overBudgetCategories.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-error" />
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 rounded-md border border-outline-soft bg-surface-high shadow-lg z-10">
              <div className="border-b border-outline-soft p-3 text-sm font-semibold text-on-surface">Budget Alerts</div>
              <ul className="max-h-48 overflow-y-auto py-1">
                {overBudgetCategories.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-soft-gray">✓ All budgets are within limits</li>
                ) : (
                  overBudgetCategories.map((item) => (
                    <li key={item.category} className="flex flex-col gap-1 border-b border-outline-soft last:border-0 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-error">
                          <span className="h-1.5 w-1.5 rounded-full bg-error" />
                          {item.category}
                        </span>
                      </div>
                      <p className="flex items-center gap-1 text-xs text-soft-gray">
                        <span>Spent:</span> 
                        <span className="font-semibold text-error">Rs. {item.spent.toLocaleString()}</span> 
                        <span>/ {item.budget.toLocaleString()}</span>
                        <TrendingUp className="h-3 w-3 text-error ml-1" title="Budget exceeded" />
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-soft" />

        {/* Avatar → Profile */}
        <Link to="/profile" aria-label="Profile">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-outline-soft transition hover:opacity-80">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-medium text-primary">
                {initials}
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
