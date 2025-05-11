import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function IncomeForm() {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('income')
      .insert([{ source, amount: +amount, date, note }])
    if (error) {
      setMsg('❌ ' + error.message)
    } else {
      setMsg('✅ Income added!')
      setSource('')
      setAmount('')
      setDate('')
      setNote('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-2">
      <h3 className="font-bold">➕ Add Income</h3>
      <input value={source} onChange={e => setSource(e.target.value)} placeholder="Source" className="border p-2 w-full" />
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" className="border p-2 w-full" />
      <input value={date} onChange={e => setDate(e.target.value)} type="date" className="border p-2 w-full" />
      <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      <p>{msg}</p>
    </form>
  )
}
