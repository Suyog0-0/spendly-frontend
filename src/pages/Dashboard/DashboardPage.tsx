// src/pages/DashboardPage.tsx
import { AppLayout } from "../components/layout/AppLayout";

export const DashboardPage = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Welcome back. Here's an overview of your finances.
        </p>
      </div>
    </AppLayout>
  );
};
