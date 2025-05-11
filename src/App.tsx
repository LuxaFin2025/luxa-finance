import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

// MUI Theme Setup (for MUI components only backup)
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Our Custom Tailwind Dark-Light Theme Context
import { ThemeProvider } from "./context/ThemeContext"; // ✅

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import SettingsPage from "./components/Settings/SettingsPage";
import Summary from "./features/summary/Summary";
import BudgetOverview from "./features/budget/BudgetOverview";
import GoalOverview from "./features/goals/GoalOverview";
import SavingsOverview from "./features/savings/SavingsOverview";
import SmartInsights from "./features/summary/SmartInsights";
import AdminAssistantMessages from "./features/admin/AdminAssistantMessages"; // ✅

const muiTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: '"Outfit", sans-serif', // ✅ Outfit applied for MUI components
  },
});

export default function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ThemeProvider> {/* ✅ Tailwind Dark-Light Controller */}
          <Router>
            <div className="font-sans"> {/* ✅ Outfit Font Applied to Full App */}
              <Routes>
                {/* Login Page */}
                <Route path="/" element={session ? <Navigate to="/dashboard" /> : <LoginForm />} />

                {/* App Pages */}
                <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/summary" element={session ? <Summary /> : <Navigate to="/" />} />
                <Route path="/budget-overview" element={session ? <BudgetOverview /> : <Navigate to="/" />} />
                <Route path="/goal-overview" element={session ? <GoalOverview /> : <Navigate to="/" />} />
                <Route path="/savings-overview" element={session ? <SavingsOverview /> : <Navigate to="/" />} />
                <Route path="/smart-insights" element={session ? <SmartInsights /> : <Navigate to="/" />} />
                <Route path="/settings" element={session ? <SettingsPage /> : <Navigate to="/" />} />

                {/* Admin View */}
                <Route path="/admin-messages" element={session ? <AdminAssistantMessages /> : <Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </SessionContextProvider>
  );
}
