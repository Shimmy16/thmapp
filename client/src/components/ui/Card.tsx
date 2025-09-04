import clsx from 'clsx';

interface CardProps {
 title?: string; // Optionaler Titel der Card
 children: React.ReactNode; // Inhalt der Card
 className?: string; // Zusätzliche CSS-Klassen
}
export const Card = ({ title, children, className }: CardProps) => (
<div className={clsx('rounded-xl border bg-white p-4 shadow', className)}>
   {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
   {children}
</div>
);