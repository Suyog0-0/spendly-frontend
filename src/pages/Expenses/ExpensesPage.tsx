import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Compute filtered and sorted expenses based on search and filters
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMonth =
        monthFilter === 'all'
          ? true
          : monthFilter === 'month'
          ? new Date(e.date).getMonth() === new Date().getMonth()
          : true;
      const matchesCategory = categoryFilter === 'all' ? true : e.category === categoryFilter;
      const matchesPayment = paymentFilter === 'all' ? true : e.paymentMethod === paymentFilter;
      return matchesSearch && matchesMonth && matchesCategory && matchesPayment;
    });
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return filtered;
  }, [expenses, searchQuery, monthFilter, categoryFilter, paymentFilter, sortOrder]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.addModalOpen) {
      setModalOpen(true);
      // Clean up the state so it doesn't re-open on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

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
          <ExpenseToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} monthFilter={monthFilter} onMonthChange={setMonthFilter} categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter} paymentFilter={paymentFilter} onPaymentChange={setPaymentFilter} sortOrder={sortOrder} onSortChange={setSortOrder} />

          {loading ? (
            <p className="text-sm text-soft-gray">Loading expenses...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : expenses.length === 0 ? (
            <EmptyExpenses />
          ) : (
            (() => {
              const filteredExpenses = filteredAndSortedExpenses;

              if (filteredExpenses.length === 0) {
                return <p className="text-sm text-soft-gray">No expenses match your search.</p>;
              }

              return (
                <>
                  <ExpenseTable expenses={filteredExpenses} onDeleted={fetchExpenses} />
                  <div className="space-y-3 sm:hidden">
                    {filteredExpenses.map((expense) => (
                      <ExpenseCard key={expense._id} expense={expense} />
                    ))}
                  </div>
                </>
              );
            })()
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
