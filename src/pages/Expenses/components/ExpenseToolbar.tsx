import { Search, Filter, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ExpenseToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  monthFilter: string;
  onMonthChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  paymentFilter: string;
  onPaymentChange: (value: string) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export const ExpenseToolbar = ({
  searchQuery,
  onSearchChange,
  monthFilter,
  onMonthChange,
  categoryFilter,
  onCategoryChange,
  paymentFilter,
  onPaymentChange,
  sortOrder,
  onSortChange,
}: ExpenseToolbarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Count active filters
  const activeFilters = [
    monthFilter !== "all",
    categoryFilter !== "all",
    paymentFilter !== "all"
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Row: Search & Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between relative" ref={filterRef}>
        <div className="flex-1 max-w-md">
          <label className="relative w-full">
            <span className="sr-only">Search expenses</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soft-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search expenses..."
              className="w-full rounded-lg border border-outline-soft bg-surface-container py-2 pl-9 pr-3 text-sm text-on-surface placeholder:text-soft-gray/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Dropdown Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border border-outline-soft bg-surface-container px-3 py-2 text-sm text-on-surface hover:bg-surface-bright"
          >
            <Filter className="h-4 w-4" />
            Filters {activeFilters > 0 && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">{activeFilters}</span>}
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg border border-outline-soft bg-surface-container px-3 py-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Filter Dropdown Menu */}
        {showFilters && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-outline-soft bg-surface-high p-4 shadow-xl z-20 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-soft-gray uppercase tracking-wide">Time Period</label>
              <select
                value={monthFilter}
                onChange={(e) => onMonthChange(e.target.value)}
                className="w-full rounded-lg border border-outline-soft bg-surface-container px-3 py-2 text-sm"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-soft-gray uppercase tracking-wide">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full rounded-lg border border-outline-soft bg-surface-container px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Food & Dining">Food &amp; Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-soft-gray uppercase tracking-wide">Payment Method</label>
              <select
                value={paymentFilter}
                onChange={(e) => onPaymentChange(e.target.value)}
                className="w-full rounded-lg border border-outline-soft bg-surface-container px-3 py-2 text-sm"
              >
                <option value="all">All Methods</option>
                <option value="Cash">Cash</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="eSewa">eSewa</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

