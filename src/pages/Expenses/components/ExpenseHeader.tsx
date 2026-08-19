// src/components/expenses/ExpenseHeader.tsx
import { Plus } from "lucide-react";

export const ExpenseHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-soft-gray">
        Track, manage, and understand where your money goes.
      </p>

      <button
        type="button"
        className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-2 pl-2 pr-5 text-sm font-semibold text-on-primary shadow-[0_8px_24px_rgba(212,175,55,0.25)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-on-primary/15">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        Add Expense
      </button>
    </div>
  );
};
