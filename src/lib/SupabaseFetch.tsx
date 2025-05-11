import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom"; // ✅ Added for auto-redirect

export function useFinanceData() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [savings, setSavings] = useState([]);
  const [goal, setGoal] = useState([]);
  const [budget, setBudget] = useState([]);
  const [networth, setNetworth] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        incomeResult,
        expenseResult,
        savingsResult,
        goalResult,
        budgetResult,
        networthResult
      ] = await Promise.all([
        supabase.from("income").select("*"),
        supabase.from("expense").select("*"),
        supabase.from("savings").select("*"),
        supabase.from("goal").select("*"),
        supabase.from("budget").select("*"),
        supabase.from("net_worth").select("*")
      ]);

      const results = [
        incomeResult,
        expenseResult,
        savingsResult,
        goalResult,
        budgetResult,
        networthResult
      ];

      // ✅ If any fetch error related to auth/session
      for (const result of results) {
        if (result.error) {
          console.error("Supabase fetch error:", result.error);

          if (result.error.status === 401 || result.error.status === 400) {
            console.log("Session expired. Logging out...");
            await supabase.auth.signOut();
            navigate("/");
            return; // Stop further execution
          }

          throw new Error(result.error.message);
        }
      }

      setIncome(incomeResult.data || []);
      setExpense(expenseResult.data || []);
      setSavings(savingsResult.data || []);
      setGoal(goalResult.data || []);
      setBudget(budgetResult.data || []);
      setNetworth(networthResult.data || []);
      setError(null);
    } catch (error: any) {
      console.error("Unexpected error fetching finance data:", error);

      setError(error instanceof Error ? error.message : "Failed to fetch data");

      if (error?.status === 401 || error?.status === 400) {
        console.log("Session expired. Logging out...");
        await supabase.auth.signOut();
        navigate("/");
      }
    }
  };

  return { income, expense, savings, goal, budget, networth, error };
}
