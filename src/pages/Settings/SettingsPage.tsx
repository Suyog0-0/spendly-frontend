// src/pages/Settings/SettingsPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Moon, Sun, Shield, User } from "lucide-react";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(
    document.body.classList.contains("light")
  );

  const toggleTheme = () => {
    document.body.classList.toggle("light");
    setIsLightMode(document.body.classList.contains("light"));
  };

  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-sm text-soft-gray">
          Manage your account preferences and app settings.
        </p>

        <div className="space-y-4">
          {/* Appearance */}
          <div className="rounded-xl border border-outline-soft bg-surface-low p-5">
            <h3 className="mb-4 text-lg font-medium text-on-surface">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isLightMode ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
                <div>
                  <p className="font-medium text-on-surface">Theme Mode</p>
                  <p className="text-sm text-soft-gray">Switch between light and dark mode.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="cursor-pointer rounded-lg border border-outline-soft bg-surface-container px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-high"
              >
                {isLightMode ? "Switch to Dark" : "Switch to Light"}
              </button>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-xl border border-outline-soft bg-surface-low p-5">
            <h3 className="mb-4 text-lg font-medium text-on-surface">Account</h3>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex w-full cursor-pointer items-center gap-3 rounded-md p-3 text-left transition hover:bg-surface-container"
              >
                <User className="h-5 w-5 text-soft-gray" />
                <div>
                  <p className="font-medium text-on-surface">Edit Profile</p>
                  <p className="text-xs text-soft-gray">Update your name, email and avatar</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => navigate("/settings/security")}
                className="flex w-full cursor-pointer items-center gap-3 rounded-md p-3 text-left transition hover:bg-surface-container"
              >
                <Shield className="h-5 w-5 text-soft-gray" />
                <div>
                  <p className="font-medium text-on-surface">Security & Password</p>
                  <p className="text-xs text-soft-gray">Change your account password</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
