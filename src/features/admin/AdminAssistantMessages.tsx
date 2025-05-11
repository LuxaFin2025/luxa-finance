import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type AssistantMessage = {
  id: string;
  user_id: string;
  question: string;
  reply: string;
  created_at: string;
};

export default function AdminAssistantMessages() {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('assistant_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow-md max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
        Luxa Admin – Assistant Messages 📋
      </h2>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">User ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Question</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Reply</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="p-3 text-sm text-gray-800 dark:text-gray-300 border-b">{msg.user_id.slice(0, 8)}...</td>
                  <td className="p-3 text-sm text-gray-800 dark:text-gray-300 border-b">{msg.question}</td>
                  <td className="p-3 text-sm text-gray-800 dark:text-gray-300 border-b">{msg.reply}</td>
                  <td className="p-3 text-sm text-gray-800 dark:text-gray-300 border-b">
                    {new Date(msg.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
