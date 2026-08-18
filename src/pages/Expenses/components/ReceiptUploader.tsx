import { UploadCloud } from "lucide-react";

export const ReceiptUploader = () => {
  return (
    <div>
      <span className="text-sm font-medium text-[#0F1B2E]">Receipt</span>
      <div className="mt-1.5 flex flex-col items-center rounded-lg border border-dashed border-[#E3E0D9] bg-[#F8F7F4] px-6 py-8 text-center">
        <UploadCloud className="h-6 w-6 text-[#4B5768]" strokeWidth={1.75} />
        <p className="mt-3 text-sm font-medium text-[#0F1B2E]">
          Upload your receipt
        </p>
        <p className="mt-0.5 text-xs text-[#4B5768]">Drag & drop or browse</p>
        <p className="mt-2 text-xs text-[#4B5768]/70">
          JPG, PNG or PDF • Max 5 MB
        </p>
      </div>
    </div>
  );
};
