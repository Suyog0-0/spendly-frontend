// src/components/AvatarUpload.tsx
import { useState, useRef } from "react";
import { uploadAvatar } from "@/lib/api";

interface AvatarUploadProps {
  currentAvatar?: string;
  onUploaded: (url: string) => void;
}

export const AvatarUpload = ({
  currentAvatar,
  onUploaded,
}: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentAvatar ?? null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file)); // local preview only, not uploaded yet
    setPendingFile(file);
  };

  const handleSave = async () => {
    if (!pendingFile) return;

    setUploading(true);
    setError(null);

    try {
      const url = await uploadAvatar(pendingFile);
      onUploaded(url);
      setPendingFile(null); // clear pending state, it's saved now
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(currentAvatar ?? null);
    setPendingFile(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-300 cursor-pointer group"
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
          Change
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {pendingFile && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={uploading}
            className="rounded-md bg-primary px-3 py-1.5 text-sm text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={uploading}
            className="rounded-md border border-outline-soft px-3 py-1.5 text-sm text-soft-gray transition hover:bg-black/5 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
