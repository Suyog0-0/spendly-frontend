import { Search, ChevronDown } from "lucide-react";

const FilterSelect = ({ label }: { label: string }) => (
  <button
    type="button"
    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-outline-soft bg-surface-container px-3 py-2 text-sm text-on-surface transition hover:border-outline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    {label}
    <ChevronDown className="h-3.5 w-3.5 text-soft-gray" />
  </button>
);

export const ExpenseToolbar = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative w-full sm:max-w-xs">
        <span className="sr-only">Search expenses</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soft-gray" />
        <input
          type="text"
          placeholder="Search expenses..."
          className="w-full rounded-lg border border-outline-soft bg-surface-container py-2 pl-9 pr-3 text-sm text-on-surface placeholder:text-soft-gray/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
        <FilterSelect label="This month" />
        <FilterSelect label="All categories" />
        <FilterSelect label="All payment methods" />
        <FilterSelect label="Newest first" />
      </div>
    </div>
  );
};
