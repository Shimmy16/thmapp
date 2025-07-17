import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-mertens-brand px-4 shadow-lg text-white">
      {/* Burger – nur auf Mobile sichtbar */}
      <button
        className="md:hidden rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-mertens-brand"
        onClick={onToggleSidebar}
        aria-label="Menü öffnen"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Logo zentriert auf Desktop, rechts auf Mobile */}
      <div className="flex-1 flex justify-center md:justify-start">
        <Link
          to="/dashboard"
          className="font-semibold text-lg tracking-wide whitespace-nowrap"
        >
          Mertens&nbsp;AG
        </Link>
      </div>
    </header>
  );
}
