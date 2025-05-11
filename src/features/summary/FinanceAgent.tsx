import { useState } from 'react';
import { supabase } from "../../lib/supabaseClient";
import { useSession } from '@supabase/auth-helpers-react';

export default function FinancialAssistant() {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const handleAsk = async () => {
    if (!question.trim()) return;
    if (!session?.user?.id) {
      setReply("User not logged in!");
      return;
    }

    setLoading(true);

    // Step 1: Generate a simple reply locally
    let generatedReply = "";
    if (question.toLowerCase().includes("saving")) {
      generatedReply = "Your savings trend looks consistent! 📈";
    } else if (question.toLowerCase().includes("expense")) {
      generatedReply = "Your expenses have been stable. 🛒 Try to keep it low!";
    } else if (question.toLowerCase().includes("goal")) {
      generatedReply = "You're progressing well towards your goals! 🎯";
    } else {
      generatedReply = "I'm still learning! Try asking about savings, expenses, or goals.";
    }

    // Step 2: Save to Supabase
    const { error } = await supabase.from('assistant_messages').insert([
      {
        user_id: session.user.id,
        question,
        reply: generatedReply
      }
    ]);

    if (error) {
      console.error('Supabase Error:', error);
      setReply('Failed to save your message.');
    } else {
      setReply(generatedReply);
    }

    setQuestion('');
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
        Luxa Financial Assistant 🤖💸
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full p-4 rounded border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-black dark:text-white
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                   transition-all mb-4"
        rows={3}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full transition-all duration-300"
      >
        {loading ? "Thinking..." : "Ask Luxa"}
      </button>

      {reply && (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mt-6 p-4 rounded">
          <h3 className="font-semibold mb-2">Luxa's Reply:</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
