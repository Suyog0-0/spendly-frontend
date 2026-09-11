import { X, Pencil, Trash2 } from "lucide-react";
import type { Expense } from "../../../types/expense";

interface ExpenseDetailsProps {
  expense: Expense;
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ExpenseDetails = ({
  expense,
  onClose,
  onEdit,
  onDelete,
}: ExpenseDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2E]/40 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#E3E0D9] px-6 py-4">
          <div>
            <h2 className="text-base font-medium text-[#0F1B2E]">
              {expense.title}
            </h2>
            <p className="text-xs text-[#4B5768]">{expense.category}</p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#4B5768] hover:bg-[#F8F7F4]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#4B5768]">
              {expense.date} · {expense.paymentMethod}
            </span>

            <span className="font-[Georgia] text-xl tabular-nums text-[#0F1B2E]">
              Rs. {expense.amount.toLocaleString()}
            </span>
          </div>

          {expense.lineItems && expense.lineItems.length > 0 && (
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-[#4B5768]">
                Line Items
              </span>

              <ul className="mt-2 divide-y divide-[#E3E0D9] rounded-lg border border-[#E3E0D9]">
                {expense.lineItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <span className="text-[#0F1B2E]">
                      {item.name}{" "}
                      <span className="text-[#4B5768]">
                        · {item.qty} × Rs. {item.unitPrice.toLocaleString()}
                      </span>
                    </span>

                    <span className="tabular-nums text-[#0F1B2E]">
                      Rs. {item.total.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {expense.notes && (
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-[#4B5768]">
                Notes
              </span>

              <p className="mt-1 text-sm text-[#0F1B2E]">{expense.notes}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#E3E0D9] px-6 py-4">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#E3E0D9] px-4 py-2 text-sm font-medium text-[#0F1B2E] hover:bg-[#F8F7F4]"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};