import { useState, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { getExpenses } from "@/lib/api";
import type { Expense } from "@/types/expense";
import { ExpenseHeader } from "./components/ExpenseHeader";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { ExpenseToolbar } from "./components/ExpenseToolbar";
import { ExpenseTable } from "./components/ExpenseTable";
import { ExpenseCard } from "./components/ExpenseCard";
import { EmptyExpenses } from "./components/EmptyExpenses";
import { AddExpenseModal } from "./components/AddExpenseModal";

export const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <AppLayout title="Expenses Overview">
      <div className="space-y-6">
        <ExpenseHeader onAddClick={() => setModalOpen(true)} />
        <ExpenseSummary />

        <section aria-label="Expense list" className="space-y-4">
          <ExpenseToolbar />

          {loading ? (
            <p className="text-sm text-soft-gray">Loading expenses...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : expenses.length === 0 ? (
            <EmptyExpenses />
          ) : (
            <>
              <ExpenseTable expenses={expenses} />
              <div className="space-y-3 sm:hidden">
                {expenses.map((expense) => (
                  <ExpenseCard key={expense._id} expense={expense} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {modalOpen && (
        <AddExpenseModal
          onClose={() => setModalOpen(false)}
          onCreated={fetchExpenses}
        />
      )}
    </AppLayout>
  );
};
