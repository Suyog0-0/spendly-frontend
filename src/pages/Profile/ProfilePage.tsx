// src/pages/Profile/ProfilePage.tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { AvatarUpload } from "@/components/AvatarUpload";
import { useAuth } from "@/lib/AuthContext";

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  return (
    <AppLayout title="Profile">
      <div className="space-y-6">
        <AvatarUpload
          currentAvatar={user?.avatar}
          onUploaded={(url) => updateUser({ avatar: url })}
        />
        <p className="text-sm text-soft-gray">
          Your profile details will appear here.
        </p>
      </div>
    </AppLayout>
  );
};
