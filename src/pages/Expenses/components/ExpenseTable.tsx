import type { Expense } from "../../../types/expense";
import { ExpenseRow } from "./ExpenseRow";

export const ExpenseTable = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-outline-soft bg-surface-low shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:block">
      <table className="w-full">
        <thead>
          <tr className="border-b border-outline-soft text-left text-[10px] font-bold uppercase tracking-widest text-soft-gray">
            <th className="py-3 pl-5 pr-3">Expense</th>
            <th className="px-3 py-3">Date</th>
            <th className="px-3 py-3">Payment Method</th>
            <th className="px-3 py-3 text-right">Amount</th>
            <th className="px-3 py-3">Receipt</th>
            <th className="py-3 pl-3 pr-5" />
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
