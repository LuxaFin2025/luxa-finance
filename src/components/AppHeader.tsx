import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import ThemeToggleButton from "./ThemeToggleButton";

export default function AppHeader() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-[#242937] shadow-md p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1
          className="text-2xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 cursor-pointer transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          Luxa Finance
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <NavButton to="/summary" label="📊 Summary" />
          <NavButton to="/budget-overview" label="💼 Budget" />
          <NavButton to="/goal-overview" label="🎯 Goals" />
          <NavButton to="/savings-overview" label="💰 Savings" />
          <NavButton to="/smart-insights" label="🧠 Insights" />
          <NavButton to="/settings" label="⚙️ Settings" />
          <ThemeToggleButton />
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </header>
  );
}

function NavButton({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1a1f2e] dark:hover:bg-[#2a3040] text-gray-700 dark:text-white rounded-xl transition-all duration-300"
    >
      {label}
    </button>
  );
}
