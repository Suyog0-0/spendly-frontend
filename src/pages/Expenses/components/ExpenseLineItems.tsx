import { Plus } from "lucide-react";
import type { ExpenseLineItem } from "../../../types/expense";

const items: ExpenseLineItem[] = [
  { name: "Chicken", qty: 2, unitPrice: 450, total: 900 },
  { name: "Vegetables", qty: 1, unitPrice: 350, total: 350 },
  { name: "Milk", qty: 2, unitPrice: 120, total: 240 },
];

export const ExpenseLineItems = () => {
  return (
    <div>
      <span className="text-sm font-medium text-[#0F1B2E]">Expense Items</span>

      <div className="mt-1.5 overflow-hidden rounded-lg border border-[#E3E0D9]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E3E0D9] bg-[#F8F7F4] text-left text-xs uppercase tracking-wide text-[#4B5768]">
              <th className="py-2 pl-3 pr-2 font-medium">Item</th>
              <th className="px-2 py-2 text-right font-medium">Qty</th>
              <th className="px-2 py-2 text-right font-medium">Unit Price</th>
              <th className="py-2 pl-2 pr-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.name}
                className="border-b border-[#E3E0D9] last:border-0"
              >
                <td className="py-2 pl-3 pr-2 text-[#0F1B2E]">{item.name}</td>
                <td className="px-2 py-2 text-right text-[#4B5768]">
                  {item.qty}
                </td>
                <td className="px-2 py-2 text-right text-[#4B5768]">
                  Rs. {item.unitPrice}
                </td>
                <td className="py-2 pl-2 pr-3 text-right font-[Georgia] tabular-nums text-[#0F1B2E]">
                  Rs. {item.total}
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
                Rs. 1,490
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        type="button"
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#0C6B4F] hover:text-[#0A5B42]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add another item
      </button>
    </div>
  );
};
