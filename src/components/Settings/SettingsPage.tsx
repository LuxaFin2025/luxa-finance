import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useSession } from "@supabase/auth-helpers-react";
import { Moon, Sun, User, Shield } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const session = useSession();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <User className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {session?.user?.email || "No user logged in"}
          </p>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <h2 className="text-lg font-semibold">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Theme</span>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded text-sm font-medium"
          >
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>

      {/* Security Section (placeholder) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Security</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Future options like password reset, 2FA.</p>
      </div>
    </div>
  );
}