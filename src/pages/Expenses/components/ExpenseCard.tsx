import { MoreHorizontal, Paperclip } from "lucide-react";
import { categoryIcons } from "../../../lib/categoryIcons";
import type { Expense } from "../../../types/expense";

export const ExpenseCard = ({ expense }: { expense: Expense }) => {
  const Icon = categoryIcons[expense.category];

  return (
    <div className="rounded-xl border border-outline-soft bg-surface-low p-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-primary">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-on-surface">
              {expense.title}
            </p>
            <p className="text-xs text-soft-gray">{expense.category}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label={`More actions for ${expense.title}`}
          className="rounded-full p-1.5 text-soft-gray hover:bg-surface-high"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-outline-soft pt-3">
        <div className="text-xs text-soft-gray">
          <p>{expense.date}</p>
          <p>{expense.paymentMethod}</p>
        </div>
        <span className="font-[Newsreader] text-base font-medium tabular-nums text-on-surface">
          {expense.amount}
        </span>
      </div>

      {expense.hasReceipt && (
        <div className="mt-2 flex items-center gap-1 text-xs text-soft-gray">
          <Paperclip className="h-3.5 w-3.5" />
          Receipt available
        </div>
      )}
    </div>
  );
};
