// src/pages/BudgetsPage.tsx
import { AppLayout } from "../components/layout/AppLayout";

export const BudgetsPage = () => {
  return (
    <AppLayout title="Budgets">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Set up and track your budgets here.
        </p>
      </div>
    </AppLayout>
  );
};
