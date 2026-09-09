// src/components/expenses/ExpenseHeader.tsx
import { Plus } from "lucide-react";

interface ExpenseHeaderProps {
  onAddClick: () => void;
}

export const ExpenseHeader = ({ onAddClick }: ExpenseHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-soft-gray">
        Track, manage, and understand where your money goes.
      </p>

      <button
        type="button"
        onClick={onAddClick}
        className="group inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-[0_4px_20px_rgba(212,175,55,0.30)] transition hover:shadow-[0_6px_24px_rgba(212,175,55,0.45)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-on-primary/20 transition group-hover:rotate-90">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        Add Expense
      </button>
    </div>
  );
};
