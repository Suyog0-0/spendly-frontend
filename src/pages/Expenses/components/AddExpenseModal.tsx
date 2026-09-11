import { useState } from "react";
import { X, Plus, Trash2, UploadCloud } from "lucide-react";
import { createExpense } from "@/lib/api";
import type {
  ExpenseCategory,
  PaymentMethod,
  ExpenseLineItem,
} from "@/types/expense";

interface AddExpenseModalProps {
  onClose: () => void;
  onCreated: () => void; // parent refetches the list
}

const CATEGORIES: ExpenseCategory[] = [
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];
const PAYMENT_METHODS: PaymentMethod[] = [
  "Cash",
  "Debit Card",
  "Credit Card",
  "eSewa",
];

export const AddExpenseModal = ({
  onClose,
  onCreated,
}: AddExpenseModalProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<ExpenseLineItem[]>([
    { name: "", qty: 1, unitPrice: 0 },
  ]);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = lineItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0,
  );

  const updateLineItem = (index: number, updates: Partial<ExpenseLineItem>) => {
    setLineItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updates } : item)),
    );
  };

  const addLineItem = () => {
    setLineItems((prev) => [...prev, { name: "", qty: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Receipt must be under 5MB");
      return;
    }
    setError(null);
    setReceipt(file);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!title.trim()) return setError("Title is required");
    if (!date) return setError("Date is required");
    if (!category) return setError("Category is required");
    const validItems = lineItems.filter(
      (i) => i.name.trim() && i.qty > 0 && i.unitPrice >= 0,
    );
    if (validItems.length === 0)
      return setError("Add at least one valid line item");

    setSubmitting(true);
    try {
      await createExpense({
        title: title.trim(),
        date,
        category,
        paymentMethod: paymentMethod || undefined,
        notes: notes.trim() || undefined,
        lineItems: validItems,
        receipt,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create expense");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-[#E3E0D9] bg-white px-3 py-2 text-sm text-[#0F1B2E] placeholder:text-[#4B5768]/60 focus:border-[#0C6B4F] focus:outline-none focus:ring-1 focus:ring-[#0C6B4F]";
  const labelClass = "text-sm font-medium text-[#0F1B2E]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B2E]/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E3E0D9] px-6 py-4">
          <h2 className="text-base font-medium text-[#0F1B2E]">Add Expense</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#4B5768] hover:bg-[#F8F7F4]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* Basic fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Expense Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grocery shopping"
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className={labelClass}>Payment Method</span>
              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as PaymentMethod)
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Select payment method
                </option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="sm:col-span-2">
              <span className={labelClass}>Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className={inputClass}
              />
            </label>
          </div>

          {/* Line items */}
          <div>
            <span className={labelClass}>Expense Items</span>

            <div className="mt-1.5 overflow-hidden rounded-lg border border-[#E3E0D9]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E3E0D9] bg-[#F8F7F4] text-left text-xs uppercase tracking-wide text-[#4B5768]">
                    <th className="py-2 pl-3 pr-2 font-medium">Item</th>
                    <th className="px-2 py-2 text-right font-medium">Qty</th>
                    <th className="px-2 py-2 text-right font-medium">
                      Unit Price
                    </th>
                    <th className="py-2 pl-2 pr-3 text-right font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#E3E0D9] last:border-0"
                    >
                      <td className="py-1.5 pl-3 pr-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            updateLineItem(index, { name: e.target.value })
                          }
                          placeholder="Item name"
                          className="w-full rounded border border-transparent bg-transparent px-1 py-1 text-sm focus:border-[#0C6B4F] focus:outline-none"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) =>
                            updateLineItem(index, {
                              qty: Number(e.target.value),
                            })
                          }
                          className="w-16 rounded border border-transparent bg-transparent px-1 py-1 text-right text-sm focus:border-[#0C6B4F] focus:outline-none"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="number"
                          min={0}
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateLineItem(index, {
                              unitPrice: Number(e.target.value),
                            })
                          }
                          className="w-20 rounded border border-transparent bg-transparent px-1 py-1 text-right text-sm focus:border-[#0C6B4F] focus:outline-none"
                        />
                      </td>
                      <td className="py-1.5 pl-2 pr-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          disabled={lineItems.length === 1}
                          className="text-[#4B5768] hover:text-red-600 disabled:opacity-30"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#F8F7F4]">
                    <td
                      colSpan={3}
                      className="py-2 pl-3 pr-2 text-right text-xs font-medium text-[#4B5768]"
                    >
                      Total
                    </td>
                    <td className="py-2 pl-2 pr-3 text-right font-[Georgia] text-base tabular-nums text-[#0F1B2E]">
                      Rs. {total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <button
              type="button"
              onClick={addLineItem}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#0C6B4F] hover:text-[#0A5B42]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add another item
            </button>
          </div>

          {/* Receipt uploader */}
          <div>
            <span className={labelClass}>Receipt (optional)</span>
            <label className="mt-1.5 flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-[#E3E0D9] bg-[#F8F7F4] px-6 py-8 text-center hover:bg-[#F1EFE9]">
              <UploadCloud
                className="h-6 w-6 text-[#4B5768]"
                strokeWidth={1.75}
              />
              <p className="mt-3 text-sm font-medium text-[#0F1B2E]">
                {receipt ? receipt.name : "Upload your receipt"}
              </p>
              <p className="mt-0.5 text-xs text-[#4B5768]">Click to browse</p>
              <p className="mt-2 text-xs text-[#4B5768]/70">
                JPG, PNG or PDF • Max 5 MB
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleReceiptChange}
                className="hidden"
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex items-center justify-between border-t border-[#E3E0D9] px-6 py-4">
          <span className="font-[Georgia] text-lg tabular-nums text-[#0F1B2E]">
            Total: Rs. {total.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-md border border-[#E3E0D9] px-4 py-2 text-sm font-medium text-[#0F1B2E] hover:bg-[#F8F7F4] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-md bg-[#0C6B4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A5B42] disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Add Expense"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
