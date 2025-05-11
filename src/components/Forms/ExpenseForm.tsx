import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ExpenseForm() {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      setMessage('❌ User not authenticated')
      return
    }

    const { error } = await supabase.from('expense').insert([
      {
        category,
        amount: parseFloat(amount),
        date,
        note,
        user_id: userData.user.id
      }
    ])

    if (error) {
      setMessage('❌ ' + error.message)
    } else {
      setMessage('✅ Expense saved!')
      setCategory('')
      setAmount('')
      setDate('')
      setNote('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-2">Save</button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  )
}
