interface ModalProps {
 open: boolean;
 onClose: () => void;
 children: React.ReactNode;
}
export const Modal = ({ open, onClose, children }: ModalProps) => {
 if (!open) return null;
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