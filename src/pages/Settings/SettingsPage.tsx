// src/pages/SettingsPage.tsx
import { AppLayout } from "../components/layout/AppLayout";

export const SettingsPage = () => {
  return (
    <AppLayout title="Settings">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Manage your account and preferences here.
        </p>
      </div>
    </AppLayout>
  );
};
