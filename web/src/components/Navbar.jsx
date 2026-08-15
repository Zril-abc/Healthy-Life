import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const desktopLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
    isActive ? 'bg-brand text-white' : 'text-ink-soft hover:bg-brand-light hover:text-brand-dark'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium ${
    isActive ? 'text-brand' : 'text-ink-soft'
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-display font-bold text-sm">
              HL
            </span>
            <span className="font-display font-bold text-lg text-ink">Healthy Life</span>
          </Link>

          {user ? (
            <>
              <nav className="hidden sm:flex items-center gap-1">
                <NavLink to="/" end className={desktopLinkClass}>Beranda</NavLink>
                <NavLink to="/favorites" className={desktopLinkClass}>Favorit</NavLink>
                <NavLink to="/activities" className={desktopLinkClass}>Aktivitas</NavLink>
                <NavLink to="/profile" className={desktopLinkClass}>Profil</NavLink>
              </nav>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-ink-soft hover:text-red-600 transition-colors shrink-0"
              >
                Keluar
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-brand">Masuk</Link>
              <Link to="/register" className="text-sm font-medium bg-brand text-white px-4 py-2 rounded-full hover:bg-brand-dark transition-colors">Daftar</Link>
            </div>
          )}
        </div>
      </header>

      {user && (
        <nav className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-surface border-t border-line flex items-center justify-around">
          <NavLink to="/" end className={mobileLinkClass}>Beranda</NavLink>
          <NavLink to="/favorites" className={mobileLinkClass}>Favorit</NavLink>
          <NavLink to="/activities" className={mobileLinkClass}>Aktivitas</NavLink>
          <NavLink to="/profile" className={mobileLinkClass}>Profil</NavLink>
        </nav>
      )}
    </>
  );
};

export default Navbar;
