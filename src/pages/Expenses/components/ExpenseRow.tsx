// src/pages/Expenses/components/ExpenseRow.tsx
import { useState } from "react";
import { Eye, Paperclip } from "lucide-react";
import { categoryIcons } from "../../../lib/categoryIcons";
import type { Expense } from "../../../types/expense";
import { ExpenseDetailModal } from "./ExpenseDetailModal";

interface Props {
  expense: Expense;
  onDeleted: () => void; // tells parent to refetch
}

export const ExpenseRow = ({ expense, onDeleted }: Props) => {
  const Icon = categoryIcons[expense.category];
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <tr className="group border-b border-outline-soft last:border-0 hover:bg-surface-container">
        <td className="py-3.5 pl-5 pr-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-primary">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-on-surface">{expense.title}</p>
              <p className="text-xs text-soft-gray">{expense.category}</p>
            </div>
          </div>
        </td>
        <td className="px-3 py-3.5 text-sm text-soft-gray">
          {new Date(expense.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </td>
        <td className="px-3 py-3.5 text-sm text-soft-gray">
          {expense.paymentMethod || "—"}
        </td>
        <td className="px-3 py-3.5 text-right">
          <span className="font-[Newsreader] text-sm font-medium tabular-nums text-on-surface transition group-hover:border-l-2 group-hover:border-primary group-hover:pl-2">
            Rs. {expense.amount.toLocaleString()}
          </span>
        </td>
        <td className="px-3 py-3.5">
          {expense.receipt ? (
            <span className="inline-flex items-center gap-1 text-xs text-soft-gray">
              <Paperclip className="h-3.5 w-3.5" />
              Receipt
            </span>
          ) : (
            <span className="text-xs text-soft-gray/40">—</span>
          )}
        </td>
        {/* Eye icon — opens detail modal */}
        <td className="py-3.5 pl-3 pr-5 text-right">
          <button
            type="button"
            aria-label={`View details for ${expense.title}`}
            onClick={() => setShowDetail(true)}
            className="cursor-pointer rounded-full p-1.5 text-soft-gray transition hover:bg-surface-high hover:text-primary"
          >
            <Eye className="h-4 w-4" />
          </button>
        </td>
      </tr>

      {showDetail && (
        <ExpenseDetailModal
          expense={expense}
          onClose={() => setShowDetail(false)}
          onDeleted={() => {
            setShowDetail(false);
            onDeleted();
          }}
        />
      )}
    </>
  );
};
