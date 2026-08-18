import { Plus } from "lucide-react";

export const ExpenseHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-soft-gray">
        Track, manage, and understand where your money goes.
      </p>

      <button
        type="button"
        className="inline-flex items-center gap-2 self-start rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-[0_8px_24px_rgba(212,175,55,0.2)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Plus className="h-4 w-4" strokeWidth={2.25} />
        Add Expense
      </button>
    </div>
  );
};
