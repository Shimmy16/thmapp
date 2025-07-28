import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const menu = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/asset/new', label: 'Asset anlegen', icon: '➕' },
  { to: '/assets-list', label: 'Asset-Liste', icon: '📋' }, // ✅ NEU hinzugefügt
  { to: '/users', label: 'Profilverwaltung', icon: '👤' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const { logout, user } = useAuth();
  const nav = useNavigate();

  if (!user) return null;

  const base = 'flex items-center gap-3 px-6 py-2 hover:bg-gray-700';
  const active = 'bg-gray-700 font-semibold';

  const handleNav = (path: string) => {
    nav(path);
    if (window.innerWidth < 768 && onClose) onClose();
  };

  return (
    <aside className="flex h-full w-60 flex-col bg-gray-800 text-gray-200">
      <Link
        to="/dashboard"
        onClick={() => handleNav('/dashboard')}
        className="border-b border-gray-700 px-6 py-4 text-xl font-bold"
      >
        Asset&nbsp;Management
      </Link>

      <nav className="flex-1 space-y-1 pt-4">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            onClick={() => handleNav(m.to)}
            className={({ isActive }) => `${base} ${isActive ? active : ''}`}
          >
            <span>{m.icon}</span>
            {m.label}
          </NavLink>
        ))}

        <button
          onClick={() => {
            logout();
            nav('/login');
            if (window.innerWidth < 768 && onClose) onClose();
          }}
          className={`${base} text-red-400 hover:text-red-300`}
        >
          <span>🚪</span> Logout
        </button>
      </nav>
    </aside>
  );
}
