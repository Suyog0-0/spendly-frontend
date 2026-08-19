import { AppLayout } from "../components/layout/AppLayout";
import { mockExpenses } from "../../data/mockExpenses";
import { ExpenseHeader } from "./components/ExpenseHeader";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { ExpenseToolbar } from "./components/ExpenseToolbar";
import { ExpenseTable } from "./components/ExpenseTable";
import { ExpenseCard } from "./components/ExpenseCard";
import { EmptyExpenses } from "./components/EmptyExpenses";

export const ExpensesPage = () => {
  const expenses = mockExpenses;

  return (
    <AppLayout title="Expenses Overview">
      <div className="space-y-6">
        <ExpenseHeader />
        <ExpenseSummary />

        <section aria-label="Expense list" className="space-y-4">
          <ExpenseToolbar />

          {expenses.length === 0 ? (
            <EmptyExpenses />
          ) : (
            <>
              <ExpenseTable expenses={expenses} />
              <div className="space-y-3 sm:hidden">
                {expenses.map((expense) => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
};
