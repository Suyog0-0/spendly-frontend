// src/pages/DashboardPage.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { getExpenses } from "@/lib/api";
import type { Expense } from "@/types/expense";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#f2ca50", "#d4af37", "#8c7325", "#a3a3a3", "#ffb4ab", "#4d4635", "#e5e2e1", "#3a3939"];

export const DashboardPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Data processing for charts
  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      map.set(e.category, (map.get(e.category) || 0) + e.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  const paymentMethodData = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      const method = e.paymentMethod || "Unknown";
      map.set(method, (map.get(method) || 0) + e.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  const trendData = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      const date = new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      map.set(date, (map.get(date) || 0) + e.amount);
    });
    // Sort chronologically by the actual date objects rather than strings, but for simplicity a reversed original list is okay if fetched newest first
    // Recharts handles order as provided
    return Array.from(map.entries()).map(([date, amount]) => ({ date, amount })).reverse();
  }, [expenses]);

  const topExpensesData = useMemo(() => {
    return [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(e => ({ name: e.title.length > 15 ? e.title.substring(0, 15) + "..." : e.title, amount: e.amount }));
  }, [expenses]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border border-outline-soft bg-surface-container p-3 text-sm shadow-xl">
          <p className="mb-1 font-semibold text-on-surface">{label || payload[0].name}</p>
          <p className="text-primary">Rs. {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Visualize your spending habits and identify trends easily.
        </p>

        {loading ? (
          <p className="text-sm text-soft-gray">Loading analytics...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : expenses.length === 0 ? (
          <p className="text-sm text-soft-gray">No expenses found. Add some to see your analytics!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            {/* Chart 1: Expenses by Category */}
            <div className="rounded-lg border border-outline-soft bg-surface-low p-5 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-on-surface">Expenses by Category</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Daily Spending Trend */}
            <div className="rounded-lg border border-outline-soft bg-surface-low p-5 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-on-surface">Spending Trend</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                    <XAxis dataKey="date" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `Rs. ${val/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="amount" stroke="#f2ca50" strokeWidth={3} dot={{ r: 4, fill: '#f2ca50', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Top 5 Largest Expenses */}
            <div className="rounded-lg border border-outline-soft bg-surface-low p-5 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-on-surface">Top 5 Largest Expenses</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topExpensesData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false} />
                    <XAxis type="number" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} width={90} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" fill="#d4af37" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Expenses by Payment Method */}
            <div className="rounded-lg border border-outline-soft bg-surface-low p-5 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-on-surface">By Payment Method</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentMethodData} margin={{ top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                    <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#f2ca50" radius={[4, 4, 0, 0]} barSize={40}>
                      {paymentMethodData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </div>
    </AppLayout>
  );
};
