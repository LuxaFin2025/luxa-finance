import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Login success:", data.session);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700
                     text-black dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     p-2 w-full rounded mb-4
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     focus:border-transparent transition-all duration-300 ease-in-out"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700
                     text-black dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     p-2 w-full rounded mb-4
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     focus:border-transparent transition-all duration-300 ease-in-out"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4 text-center transition-opacity duration-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded
                     transition-all duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
}
