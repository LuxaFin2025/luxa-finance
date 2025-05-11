import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export function useFinanceData() {
  const session = useSession();
  const userId = session?.user?.id;

  const [income, setIncome] = useState<any[]>([]);
  const [expense, setExpense] = useState<any[]>([]);
  const [savings, setSavings] = useState<any[]>([]);
  const [budget, setBudget] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const [incomeData, expenseData, savingsData, budgetData] = await Promise.all([
        supabase.from("income").select("*").eq("user_id", userId),
        supabase.from("expense").select("*").eq("user_id", userId),
        supabase.from("savings").select("*").eq("user_id", userId),
        supabase.from("budget").select("*").eq("user_id", userId),
      ]);

      if (incomeData.data) setIncome(incomeData.data);
      if (expenseData.data) setExpense(expenseData.data);
      if (savingsData.data) setSavings(savingsData.data);
      if (budgetData.data) setBudget(budgetData.data);
    };

    fetchData();
  }, [userId]);

  return { income, expense, savings, budget };
}
