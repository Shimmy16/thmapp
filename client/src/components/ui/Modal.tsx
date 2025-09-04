interface ModalProps {
 open: boolean; // Steuert Sichtbarkeit
 onClose: () => void; // Callback zum Schliessen
 children: React.ReactNode; // Inhalt des Modals
}
export const Modal = ({ open, onClose, children }: ModalProps) => {
 if (!open) return null; // Wenn nicht offen, nichts rendern
 return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
<div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
<button
         className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
         onClick={onClose}
>
         ✕
</button>
       {children}
</div>
</div>
 );
};