// src/pages/AnalyticsPage.tsx
import { AppLayout } from "../components/layout/AppLayout";

export const AnalyticsPage = () => {
  return (
    <AppLayout title="Analytics">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Spending insights and trends will appear here.
        </p>
      </div>
    </AppLayout>
  );
};
