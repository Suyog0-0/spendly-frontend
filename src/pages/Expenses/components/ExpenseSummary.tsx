import { Wallet, Calendar, Receipt, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Metric = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const metrics: Metric[] = [
  { label: "Total Expenses", value: "Rs. 42,850", icon: Wallet },
  { label: "This Month", value: "Rs. 18,420", icon: Calendar },
  { label: "Transactions", value: "34", icon: Receipt },
  { label: "Average Expense", value: "Rs. 1,260", icon: TrendingUp },
];

export const ExpenseSummary = () => {
  return (
    <section
      aria-label="Expense summary"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {metrics.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col gap-2 rounded-xl border border-outline-soft bg-surface-low p-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition active:scale-[0.98]"
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-soft-gray">
              {label}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-primary">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </div>
          <p className="font-[Newsreader] text-2xl font-medium text-on-surface">
            {value}
          </p>
        </div>
      ))}
    </section>
  );
};
