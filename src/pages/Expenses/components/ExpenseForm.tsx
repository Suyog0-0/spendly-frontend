export const ExpenseForm = () => {
  const inputClass =
    "mt-1.5 w-full rounded-md border border-[#E3E0D9] bg-white px-3 py-2 text-sm text-[#0F1B2E] placeholder:text-[#4B5768]/60 focus:border-[#0C6B4F] focus:outline-none focus:ring-1 focus:ring-[#0C6B4F]";
  const labelClass = "text-sm font-medium text-[#0F1B2E]";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className={labelClass}>Expense Title</span>
        <input
          type="text"
          placeholder="e.g. Grocery shopping"
          className={inputClass}
        />
      </label>

      <label>
        <span className={labelClass}>Date</span>
        <input type="text" placeholder="Aug 17, 2026" className={inputClass} />
      </label>

      <label>
        <span className={labelClass}>Category</span>
        <select className={inputClass} defaultValue="">
          <option value="" disabled>
            Select category
          </option>
        </select>
      </label>

      <label>
        <span className={labelClass}>Payment Method</span>
        <select className={inputClass} defaultValue="">
          <option value="" disabled>
            Select payment method
          </option>
        </select>
      </label>

      <label className="sm:col-span-2">
        <span className={labelClass}>Notes</span>
        <textarea placeholder="Add a note..." rows={3} className={inputClass} />
      </label>
    </div>
  );
};
