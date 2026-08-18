// src/pages/TransactionsPage.tsx
import { AppLayout } from "../components/layout/AppLayout";

export const TransactionsPage = () => {
  return (
    <AppLayout title="Transactions">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Your transaction history will appear here.
        </p>
      </div>
    </AppLayout>
  );
};
