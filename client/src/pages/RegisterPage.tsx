// pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export default function RegisterPage() {
 const { register } = useAuth();
 const navigate      = useNavigate();
 const [form,  setForm]  = useState({ email: '', password: '', confirm: '' });
 const [error, setError] = useState<string | null>(null);
 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setError(null);
   if (!form.email.trim())           return setError('Bitte E-Mail eingeben.');
   if (form.password !== form.confirm)
     return setError('Passwörter stimmen nicht überein.');
   try {
     await register(form.email, form.password);
     navigate('/dashboard', { replace: true });
   } catch {
     setError('Registrierung fehlgeschlagen.');
   }
 };
 return (
<div className="flex min-h-screen flex-col items-center justify-center bg-mertens-gray p-4">
     {/* ───────── Logo ───────── */}
<img
       src="/Bild.png"               /* Logo-Datei in /public oder /src/assets */
       alt="Mertens-Logo"
       className="mb-6 h-40 w-auto drop-shadow-lg"
     />
<form
       onSubmit={handleSubmit}
       className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-xl"
>
<h2 className="text-center text-2xl font-bold text-mertens-brand">
         Registrieren
</h2>
       {error && (
<p className="rounded bg-red-100 px-2 py-1 text-sm text-red-700">
           {error}
</p>
       )}
<input
         type="email"
         required
         placeholder="E-Mail"
         className="w-full rounded border p-2"
         value={form.email}
         onChange={(e) => setForm({ ...form, email: e.target.value })}
       />
<input
         type="password"
         required
         placeholder="Passwort"
         className="w-full rounded border p-2"
         value={form.password}
         onChange={(e) => setForm({ ...form, password: e.target.value })}
       />
<input
         type="password"
         required
         placeholder="Passwort bestätigen"
         className="w-full rounded border p-2"
         value={form.confirm}
         onChange={(e) => setForm({ ...form, confirm: e.target.value })}
       />
<button
         type="submit"
         className="w-full rounded bg-mertens-accent py-2 font-semibold text-white hover:bg-mertens-brand"
>
         Konto anlegen
</button>
       {/* ---------- neuer Link zurück zum Login ---------- */}
<p className="text-center text-sm">
         Bereits registriert?{' '}
<Link
           to="/login"
           className="text-mertens-accent hover:underline"
>
           Zum Login
</Link>
</p>
</form>
</div>
 );
}