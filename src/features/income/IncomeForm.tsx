import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function IncomeForm() {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      setMessage('User not authenticated.')
      return
    }

    const { error } = await supabase.from('income').insert([
      {
        source,
        amount: parseFloat(amount),
        date,
        note,
        user_id: userData.user.id
      }
    ])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Income saved successfully!')
      setSource('')
      setAmount('')
      setDate('')
      setNote('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Add Income</h2>

      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-black dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-black dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-black dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
        required
      />
      <textarea
        placeholder="Add a Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-black dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   p-2 w-full rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
      >
        Save Income
      </button>

      {message && (
        <p className="text-sm text-center mt-2 text-gray-700 dark:text-gray-300 transition-opacity duration-500">
          {message}
        </p>
      )}
    </form>
  )
}
