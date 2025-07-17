// pages/LoginPage.tsx
import { useState } from 'react';
import { useAuth }  from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
 const { login } = useAuth();
 const navigate  = useNavigate();
 const [form, setForm] = useState({ email: '', password: '' });
 const [error, setErr] = useState('');
 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     await login(form.email, form.password);
     navigate('/dashboard');
   } catch {
     setErr('Login fehlgeschlagen');
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
     {/* ───────── Formular ───────── */}
<form
       onSubmit={handleSubmit}
       className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-xl"
>
<h2 className="text-center text-2xl font-bold text-mertens-brand">
         Anmelden
</h2>
       {error && (
<p className="rounded bg-red-100 px-2 py-1 text-sm text-red-700">
           {error}
</p>
       )}
<input
         type="email"
         placeholder="E-Mail"
         className="w-full rounded border p-2"
         value={form.email}
         onChange={(e) => setForm({ ...form, email: e.target.value })}
         required
       />
<input
         type="password"
         placeholder="Passwort"
         className="w-full rounded border p-2"
         value={form.password}
         onChange={(e) => setForm({ ...form, password: e.target.value })}
         required
       />
<button
         type="submit"
         className="w-full rounded bg-mertens-accent py-2 font-semibold text-white hover:bg-mertens-brand"
>
         Login
</button>
<p className="text-center text-sm">
         Noch kein Konto?{' '}
<span
           className="cursor-pointer text-mertens-accent hover:underline"
           /* TODO: Registrierungsmodal öffnen */
           onClick={() => navigate('/register')}
>
           Registrieren
</span>
</p>
</form>
</div>
 );
}