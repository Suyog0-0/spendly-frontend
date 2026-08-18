import { Receipt, Plus } from "lucide-react";

export const EmptyExpenses = () => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-outline-soft bg-surface-low px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high text-primary">
        <Receipt className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <h2 className="mt-4 font-[Newsreader] text-base font-medium text-on-surface">
        No expenses yet
      </h2>
      <p className="mt-1 max-w-xs text-sm text-soft-gray">
        Start tracking your spending by adding your first expense.
      </p>
      <button
        type="button"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition hover:brightness-110"
      >
        <Plus className="h-4 w-4" />
        Add Expense
      </button>
    </div>
  );
};
