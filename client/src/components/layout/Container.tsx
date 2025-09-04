export default function Container({ children }: { children: React.ReactNode }) {
 return (
     // Container-Komponente: sorgt für max. Breite, horizontales Padding und zentrierte Ausrichtung
<div className="mx-auto w-full max-w-6xl px-4 py-6">{children}</div>
 );
}