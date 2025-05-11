import { useTheme } from "../context/ThemeContext";
// ✅ Make sure correct path

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
      title="Toggle Theme"
    >
      {theme === "dark" ? (
        <span role="img" aria-label="Sun">
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="Moon">
          🌙
        </span>
      )}
    </button>
  );
}
