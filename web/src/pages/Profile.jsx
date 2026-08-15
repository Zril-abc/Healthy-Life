import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-8 pb-24 sm:pb-8">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Profil</h1>

      <div className="bg-surface border border-line rounded-2xl p-6 flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center font-display font-bold text-2xl mb-3">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <h2 className="font-display font-semibold text-lg text-ink">{user?.name}</h2>
        <p className="text-sm text-ink-soft">{user?.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full border border-red-200 text-red-600 font-semibold text-sm py-3 rounded-xl hover:bg-red-50 transition-colors"
      >
        Keluar dari Akun
      </button>
    </div>
  );
};

export default Profile;
