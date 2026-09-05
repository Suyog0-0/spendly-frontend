import { useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";

export const DashboardPage = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <p className="text-sm text-soft-gray">
          Welcome back. Here's an overview of your finances.
        </p>
      </div>
    </AppLayout>
  );
};
