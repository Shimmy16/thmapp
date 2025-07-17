// pages/AddAssetPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../hooks/useAssets';
export default function AddAssetPage() {
 const { createAsset } = useAssets();
 const navigate = useNavigate();
 const [form, setForm] = useState({
   name: '',
   type: '',
   location: '',
   status: 'in Betrieb'
 });
 const submit = async (e: React.FormEvent) => {
   e.preventDefault();
   await createAsset(form);
   navigate('/dashboard');
 };
 return (
   <div className="main-wrapper">
     <h1 className="mb-4 text-2xl font-bold">Neues Asset anlegen</h1>
     <form onSubmit={submit} className="space-y-4 max-w-md">
       {['name', 'type', 'location'].map((field) => (
         <input
           key={field}
           required
           placeholder={field}
           className="w-full rounded border p-2"
           value={form[field as keyof typeof form]}
           onChange={(e) => setForm({ ...form, [field]: e.target.value })}
         />
       ))}
       <select
         className="w-full rounded border p-2"
         value={form.status}
         onChange={(e) => setForm({ ...form, status: e.target.value })}
       >
         <option>in Betrieb</option>
         <option>in Wartung</option>
         <option>ausser Betrieb</option>
       </select>
       <button className="w-full rounded bg-mertens-accent py-2 font-semibold text-white hover:bg-mertens-brand">
         Speichern
       </button>
     </form>
   </div>
 );
}