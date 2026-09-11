export type ExpenseCategory =
  | "Food & Dining"
  | "Transportation"
  | "Utilities"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Education"
  | "Other";

export type PaymentMethod = "Cash" | "Debit Card" | "Credit Card" | "eSewa";

export interface ExpenseLineItem {
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface Expense {
  _id: string;
  title: string;
  category: ExpenseCategory;
  date: string;
  paymentMethod?: PaymentMethod;
  amount: number;
  notes?: string;
  lineItems?: ExpenseLineItem[];
  receipt?: string; // Cloudinary URL
}
