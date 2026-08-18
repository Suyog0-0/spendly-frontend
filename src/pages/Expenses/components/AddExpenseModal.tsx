import { X } from "lucide-react";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseLineItems } from "./ExpenseLineItems";
import { ReceiptUploader } from "./ReceiptUploader";

export const AddExpenseModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2E]/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E3E0D9] px-6 py-4">
          <h2 className="text-base font-medium text-[#0F1B2E]">Add Expense</h2>
          <button
            type="button"
            aria-label="Close"
            className="rounded-md p-1.5 text-[#4B5768] hover:bg-[#F8F7F4]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          <ExpenseForm />
          <ExpenseLineItems />
          <ReceiptUploader />
        </div>

        <div className="flex items-center justify-between border-t border-[#E3E0D9] px-6 py-4">
          <span className="font-[Georgia] text-lg tabular-nums text-[#0F1B2E]">
            Total: Rs. 1,490
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border border-[#E3E0D9] px-4 py-2 text-sm font-medium text-[#0F1B2E] hover:bg-[#F8F7F4]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-[#0C6B4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A5B42]"
            >
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
