// src/pages/Profile/ProfilePage.tsx
import { AppLayout } from "../components/layout/AppLayout";

export const ProfilePage = () => {
  return (
    <AppLayout title="Profile">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Your profile details will appear here.
        </p>
      </div>
    </AppLayout>
  );
};
