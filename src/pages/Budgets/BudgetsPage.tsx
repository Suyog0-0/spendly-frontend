// src/pages/Budgets/BudgetsPage.tsx
import { useState, useEffect } from "react";
import { AppLayout } from "../../components/layout/AppLayout";
import { Plus, Trash2, Loader2, TrendingUp } from "lucide-react";
import { getExpenses } from "../../lib/api";

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

export const BudgetsPage = () => {
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [spent, setSpent] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const saved = localStorage.getItem("spendly_budgets");
      if (saved) {
        try {
          setBudgets(JSON.parse(saved));
        } catch (e) {}
      }
      try {
        const expenses = await getExpenses();
        const spentData: Record<string, number> = {};
        expenses.forEach((e) => {
          spentData[e.category] = (spentData[e.category] || 0) + e.amount;
        });
        setSpent(spentData);
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveBudgets = (newBudgets: Record<string, number>) => {
    setBudgets(newBudgets);
    localStorage.setItem("spendly_budgets", JSON.stringify(newBudgets));
  };

  const handleAddBudget = () => {
    if (!amount || isNaN(Number(amount))) return;
    const newBudgets = { ...budgets, [selectedCategory]: Number(amount) };
    saveBudgets(newBudgets);
    setAmount("");
  };

  const handleRemoveBudget = (category: string) => {
    const newBudgets = { ...budgets };
    delete newBudgets[category];
    saveBudgets(newBudgets);
  };

  return (
    <AppLayout title="Budgets">
      <div className="space-y-6 max-w-3xl mx-auto">
        <p className="text-sm text-soft-gray">
          Set monthly budget limits for your expense categories.
        </p>

        {/* Add Budget Form */}
        <div className="rounded-xl border border-outline-soft bg-surface-low p-5">
          <h3 className="mb-4 text-base font-medium text-on-surface">Set New Budget</h3>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="text-sm font-medium text-on-surface">Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 w-full rounded-md border border-outline-soft bg-surface-container px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="flex-1">
              <span className="text-sm font-medium text-on-surface">Amount Limit (Rs.)</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                className="mt-1 w-full rounded-md border border-outline-soft bg-surface-container px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={handleAddBudget}
              className="mt-2 sm:mt-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-container h-[38px] flex items-center justify-center gap-2 transition"
            >
              <Plus className="h-4 w-4" /> Save
            </button>
          </div>
        </div>

        {/* Budget List */}
        <div className="rounded-xl border border-outline-soft bg-surface-low overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-soft bg-surface-container text-left text-xs uppercase tracking-wide text-soft-gray">
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 text-right font-medium">Budget Limit</th>
                <th className="px-5 py-3 text-right font-medium">Spent</th>
                <th className="px-5 py-3 text-right font-medium">Remaining</th>
                <th className="px-5 py-3 text-right font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-soft-gray">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                  </td>
                </tr>
              ) : Object.keys(budgets).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-soft-gray">
                    No budgets set yet. Add one above!
                  </td>
                </tr>
              ) : (
                Object.entries(budgets).map(([cat, amt]) => {
                  const currentSpent = spent[cat] || 0;
                  const remaining = amt - currentSpent;
                  const exceeded = remaining < 0;

                  return (
                    <tr key={cat} className="border-b border-outline-soft last:border-0 hover:bg-surface-container/50">
                      <td className="px-5 py-3 font-medium text-on-surface">{cat}</td>
                      <td className="px-5 py-3 text-right font-[Georgia] text-base text-primary tabular-nums">
                        Rs. {amt.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right font-medium tabular-nums text-on-surface">
                        Rs. {currentSpent.toLocaleString()}
                      </td>
                      <td className={`px-5 py-3 text-right font-medium tabular-nums ${exceeded ? "text-error" : "text-green-500"}`}>
                        {exceeded ? (
                          <span className="flex items-center justify-end gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Over by Rs. {Math.abs(remaining).toLocaleString()}
                          </span>
                        ) : (
                          `Rs. ${remaining.toLocaleString()}`
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleRemoveBudget(cat)}
                          className="text-soft-gray hover:text-red-500 transition cursor-pointer p-1 rounded-md"
                          title="Remove Budget"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AppLayout>
  );
};
