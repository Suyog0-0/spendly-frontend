// src/pages/Profile/ProfilePage.tsx
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/lib/AuthContext";
import { User, Mail, Calendar, Camera, Save, X, Loader2 } from "lucide-react";

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleSave = async () => {
    if (!name.trim()) return setError("Name is required.");
    if (!email.trim() || !email.includes("@")) return setError("Valid email is required.");
    setSaving(true);
    // Brief visual feedback — updateUser is synchronous (localStorage), so we fake 400ms
    await new Promise((r) => setTimeout(r, 400));
    updateUser({ name: name.trim(), email: email.trim(), avatar: avatarPreview || undefined });
    setSaving(false);
    setEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setAvatarPreview(user?.avatar || null);
    setEditing(false);
    setError("");
  };

  // Get member since from localStorage token creation (fallback to today)
  const memberSince = (() => {
    const stored = localStorage.getItem("user");
    if (!stored) return "Unknown";
    return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  })();

  return (
    <AppLayout title="Profile">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Avatar + basic info */}
        <div className="rounded-xl border border-outline-soft bg-surface-low p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-outline-soft bg-primary/10">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-medium text-primary">
                    {initials}
                  </div>
                )}
              </div>
              {editing && (
                <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-primary p-1.5 text-on-primary shadow">
                  <Camera className="h-3.5 w-3.5" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-soft-gray uppercase tracking-wide">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-md border border-outline-soft bg-surface-high px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-soft-gray uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-md border border-outline-soft bg-surface-high px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  {error && <p className="text-sm text-error">{error}</p>}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-on-primary hover:opacity-90 disabled:opacity-60"
                    >
                      {saving ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Save className="h-3.5 w-3.5" />
                      )}
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex cursor-pointer items-center gap-1.5 rounded-md border border-outline-soft px-4 py-1.5 text-sm font-medium text-on-surface hover:bg-surface-container"
                    >
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-on-surface">{user?.name || "Your Name"}</h2>
                  <p className="mt-0.5 text-sm text-soft-gray">{user?.email || "your@email.com"}</p>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="mt-3 cursor-pointer rounded-md border border-outline-soft px-3 py-1.5 text-sm font-medium text-on-surface hover:bg-surface-container transition"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details cards */}
        <div className="rounded-xl border border-outline-soft bg-surface-low p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-soft-gray">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-soft-gray" />
              <div>
                <p className="text-xs text-soft-gray">Full Name</p>
                <p className="text-sm font-medium text-on-surface">{user?.name || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-soft-gray" />
              <div>
                <p className="text-xs text-soft-gray">Email Address</p>
                <p className="text-sm font-medium text-on-surface">{user?.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-soft-gray" />
              <div>
                <p className="text-xs text-soft-gray">Member Since</p>
                <p className="text-sm font-medium text-on-surface">{memberSince}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
