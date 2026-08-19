// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { ExpensesPage } from "./pages/Expenses/ExpensesPage";
import { TransactionsPage } from "./pages/Transactions/TransactionsPage";
import { BudgetsPage } from "./pages/Budgets/BudgetsPage";
import { AnalyticsPage } from "./pages/Analytics/AnalyticsPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { ServerErrorPage } from "./pages/ServerError/ServerErrorPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
// import { LoginPage } from "./pages/Login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/transactions" element={<TransactionsPage />} /> 
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Auth Pages */}
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Error Pages */}
        <Route path="/error" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
