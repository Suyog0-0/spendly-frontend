// src/lib/api.ts
import type {
  Expense,
  ExpenseLineItem,
  ExpenseCategory,
  PaymentMethod,
} from "@/types/expense";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

const authHeader = (): HeadersInit => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(`${API_URL}/api/auth/avatar`, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Upload failed");
  }

  const data = await res.json();
  return data.avatar;
};

export interface CreateExpenseInput {
  title: string;
  category: ExpenseCategory;
  paymentMethod?: PaymentMethod;
  notes?: string;
  date: string; // "YYYY-MM-DD"
  lineItems: ExpenseLineItem[];
  receipt?: File | null;
}

export const createExpense = async (
  input: CreateExpenseInput,
): Promise<Expense> => {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("category", input.category);
  formData.append("date", input.date);
  if (input.paymentMethod)
    formData.append("paymentMethod", input.paymentMethod);
  if (input.notes) formData.append("notes", input.notes);
  formData.append("lineItems", JSON.stringify(input.lineItems));
  if (input.receipt) formData.append("receipt", input.receipt);

  const res = await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create expense");
  }

  const data = await res.json();
  return data.expense;
};

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch(`${API_URL}/api/expenses`, {
    headers: authHeader(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch expenses");
  }

  const data = await res.json();
  return data.expenses;
};

export const deleteExpense = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete expense");
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const res = await fetch(`${API_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to change password");
  }
};
