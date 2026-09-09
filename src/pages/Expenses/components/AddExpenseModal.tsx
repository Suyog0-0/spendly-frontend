import { useState, useEffect } from "react";
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
  // Load budgets from localStorage
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  useEffect(() => {
    const saved = localStorage.getItem("spendly_budgets");
    if (saved) {
      try {
        setBudgets(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<ExpenseLineItem[]>([
    { name: "", qty: 1, unitPrice: 0, total: 0 },
  ]);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
    setLineItems((prev) => [
      ...prev,
      { name: "", qty: 1, unitPrice: 0, total: 0 },
    ]);
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
    "mt-1 w-full rounded-md border border-outline-soft bg-surface-high px-3 py-1.5 text-sm text-on-surface placeholder:text-soft-gray/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const labelClass = "text-sm font-medium text-on-surface";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-lg bg-surface-high shadow-xl">
        <div className="flex items-center justify-between border-b border-outline-soft px-5 py-3">
          <h2 className="text-base font-medium text-on-surface">Add Expense</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1.5 text-soft-gray hover:bg-surface-container"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          {/* Basic fields */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Expense Title <span className="text-error">*</span></span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grocery shopping"
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>Date <span className="text-error">*</span></span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>Category <span className="text-error">*</span></span>
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
              {/* Budget hint: shows limit and remaining for selected category */}
              {category && budgets[category] && (
                <p className={`mt-1 text-xs font-medium ${
                  total > budgets[category] ? "text-error" : "text-soft-gray"
                }`}>
                  Budget: Rs. {budgets[category].toLocaleString()} &nbsp;·&nbsp;
                  {total > budgets[category]
                    ? `Exceeded by Rs. ${(total - budgets[category]).toLocaleString()}`
                    : `Rs. ${(budgets[category] - total).toLocaleString()} remaining`}
                </p>
              )}
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
                rows={2}
                className={inputClass}
              />
            </label>
          </div>

          {/* Line items */}
          <div>
            <span className={labelClass}>Expense Items <span className="text-error">*</span></span>

            <div className="mt-1.5 overflow-hidden rounded-lg border border-outline-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-outline-soft bg-surface-container text-left text-xs uppercase tracking-wide text-soft-gray">
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
                      className="border-b border-outline-soft last:border-0"
                    >
                      <td className="py-1.5 pl-3 pr-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            updateLineItem(index, { name: e.target.value })
                          }
                          placeholder="Item name"
                          className="w-full rounded border border-transparent bg-transparent px-1 py-1 text-sm focus:border-primary focus:outline-none"
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
                          className="w-16 rounded border border-transparent bg-transparent px-1 py-1 text-right text-sm focus:border-primary focus:outline-none"
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
                          className="w-20 rounded border border-transparent bg-transparent px-1 py-1 text-right text-sm focus:border-primary focus:outline-none"
                        />
                      </td>
                      <td className="py-1.5 pl-2 pr-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          disabled={lineItems.length === 1}
                          className="text-soft-gray hover:text-red-600 disabled:opacity-30"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-container">
                    <td
                      colSpan={3}
                      className="py-2 pl-3 pr-2 text-right text-xs font-medium text-soft-gray"
                    >
                      Total
                    </td>
                    <td className="py-2 pl-2 pr-3 text-right font-[Georgia] text-base tabular-nums text-on-surface">
                      Rs. {total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
                {/* Budget warning — advisory only, does NOT block saving */}
                {category && budgets[category] && total > budgets[category] && (
                  <p className="mt-1 px-3 pb-2 text-xs font-medium text-error">
                    ⚠ Exceeds budget by Rs. {(total - budgets[category]).toLocaleString()} — you can still save.
                  </p>
                )}
              </table>
            </div>

            <button
              type="button"
              onClick={addLineItem}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-container"
            >
              <Plus className="h-3.5 w-3.5" />
              Add another item
            </button>
          </div>

          {/* Receipt uploader */}
          <div>
            <span className={labelClass}>Receipt</span>
            <label className="mt-1 flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-outline-soft bg-surface-container px-4 py-4 text-center hover:bg-surface-bright">
              <UploadCloud
                className="h-5 w-5 text-soft-gray"
                strokeWidth={1.75}
              />
              <p className="mt-2 text-sm font-medium text-on-surface">
                {receipt ? receipt.name : "Upload your receipt"}
              </p>
              <p className="mt-0.5 text-xs text-soft-gray">Click to browse (JPG, PNG or PDF • Max 5 MB)</p>
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

        <div className="flex items-center justify-between border-t border-outline-soft px-5 py-3">
          <span className="font-[Georgia] text-lg tabular-nums text-on-surface">
            Total: Rs. {total.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-md border border-outline-soft px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-container disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Add Expense"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
