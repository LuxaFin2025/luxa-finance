import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function IncomeList() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('income').select('*').order('date', { ascending: false })
      if (!error) setEntries(data)
    }
    fetchData()
  }, [])

  return (
    <div className="p-4">
      <h3 className="font-bold mb-2">📋 Income History</h3>
      <ul className="space-y-1">
        {entries.map(entry => (
          <li key={entry.id} className="border p-2 rounded text-sm">
            ₹{entry.amount} – {entry.source} on {entry.date}
          </li>
        ))}
      </ul>
    </div>
  )
}
