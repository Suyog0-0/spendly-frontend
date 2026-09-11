// src/pages/Expenses/components/ExpenseDetailModal.tsx
import { useState } from "react";
import { X, Paperclip, ExternalLink, Trash2, Loader2 } from "lucide-react";
import type { Expense } from "@/types/expense";
import { deleteExpense } from "@/lib/api";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface Props {
  expense: Expense;
  onClose: () => void;
  onDeleted: () => void;
}

export const ExpenseDetailModal = ({ expense, onClose, onDeleted }: Props) => {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  // Lightbox state — stores the URL of image to show fullscreen
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const handleDelete = async () => {
    setShowConfirm(false);
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteExpense(expense._id);
      onDeleted();
      onClose();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete.");
      setDeleting(false);
    }
  };

  const isImage = expense.receipt?.match(/\.(jpg|jpeg|png|webp)$/i);

  return (
    <>
      {/* Image lightbox — fullscreen overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="Receipt full size"
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Confirm delete modal */}
      {showConfirm && (
        <ConfirmModal
          message={`Delete "${expense.title}"? This cannot be undone.`}
          confirmLabel="Delete"
          danger
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-surface-high shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-outline-soft px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-on-surface">{expense.title}</h2>
              <p className="mt-0.5 text-xs text-soft-gray">{expense.category}</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="cursor-pointer rounded-md p-1.5 text-soft-gray hover:bg-surface-container"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-5 px-5 py-5">
            {/* Date, Payment, Amount */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-soft-gray">Date</p>
                <p className="mt-0.5 text-sm font-medium text-on-surface">
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-soft-gray">Payment</p>
                <p className="mt-0.5 text-sm font-medium text-on-surface">
                  {expense.paymentMethod || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-soft-gray">Total</p>
                <p className="mt-0.5 font-[Newsreader] text-sm font-medium tabular-nums text-on-surface">
                  Rs. {expense.amount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Line items */}
            {expense.lineItems && expense.lineItems.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-soft-gray">Items</p>
                <div className="overflow-hidden rounded-lg border border-outline-soft">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-outline-soft bg-surface-container text-left text-xs text-soft-gray">
                        <th className="py-2 pl-3 pr-2 font-medium">Item</th>
                        <th className="px-2 py-2 text-right font-medium">Qty</th>
                        <th className="px-2 py-2 text-right font-medium">Price</th>
                        <th className="py-2 pl-2 pr-3 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expense.lineItems.map((item, i) => (
                        <tr key={i} className="border-b border-outline-soft last:border-0">
                          <td className="py-2 pl-3 pr-2 text-on-surface">{item.name}</td>
                          <td className="px-2 py-2 text-right text-soft-gray">{item.qty}</td>
                          <td className="px-2 py-2 text-right text-soft-gray">Rs. {item.unitPrice.toLocaleString()}</td>
                          <td className="py-2 pl-2 pr-3 text-right font-medium text-on-surface">
                            Rs. {(item.qty * item.unitPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            {expense.notes && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-soft-gray">Notes</p>
                <p className="text-sm text-on-surface">{expense.notes}</p>
              </div>
            )}

            {/* Receipt */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-soft-gray">Receipt</p>
              {expense.receipt ? (
                isImage ? (
                  /* Click to open lightbox */
                  <button
                    type="button"
                    className="block w-full cursor-zoom-in"
                    onClick={() => setLightboxSrc(expense.receipt!)}
                    aria-label="View receipt full size"
                  >
                    <img
                      src={expense.receipt}
                      alt="Receipt"
                      className="max-h-48 w-full rounded-lg border border-outline-soft object-contain transition hover:opacity-90"
                    />
                    <p className="mt-1 text-center text-xs text-soft-gray">Click to enlarge</p>
                  </button>
                ) : (
                  <a
                    href={expense.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-outline-soft px-4 py-2 text-sm text-primary hover:bg-surface-container"
                  >
                    <Paperclip className="h-4 w-4" />
                    View Receipt
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )
              ) : (
                <p className="text-sm text-soft-gray">No receipt attached.</p>
              )}
            </div>

            {deleteError && <p className="text-sm text-error">{deleteError}</p>}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-outline-soft px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-outline-soft px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              disabled={deleting}
              className="flex items-center gap-1.5 rounded-md border border-error/40 bg-error/10 px-4 py-2 text-sm font-medium text-error hover:bg-error/20 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
