import { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer'; // 👈 Import ergänzt

// AppShell: Umhüllt die ganze App mit Sidebar, Header, Footer
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wenn Sidebar offen → Scroll im Body deaktivieren (Mobile UX)
    document.body.style.overflow = open ? 'hidden' : 'auto';
    // Cleanup, falls Komponente unmounted wird
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-60 transform bg-white shadow-lg transition-transform duration-200
                   md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Haupt-Inhalt mit Header und Footer */}
      <div className="flex flex-1 flex-col bg-gray-50">
        <Header onToggleSidebar={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-6 pt-4 md:pt-6">
          {children}
        </main>
        <Footer /> {/* 👈 Footer ans Ende der rechten Spalte */}
      </div>
    </div>
  );
}
