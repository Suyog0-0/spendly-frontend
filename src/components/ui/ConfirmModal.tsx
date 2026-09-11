// src/components/ui/ConfirmModal.tsx
// A simple, reusable confirmation dialog used app-wide instead of window.confirm()
interface ConfirmModalProps {
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean; // makes confirm button red
}

export const ConfirmModal = ({
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="w-full max-w-sm rounded-xl border border-outline-soft bg-surface-high p-5 shadow-xl">
        <p className="text-sm text-on-surface">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-outline-soft px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              danger
                ? "border border-error/40 bg-error/10 text-error hover:bg-error/20"
                : "bg-primary text-on-primary hover:opacity-90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
