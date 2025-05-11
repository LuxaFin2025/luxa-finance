
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
