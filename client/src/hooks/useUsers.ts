import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
export interface User { id: string; email: string } // User-Interface
export function useUsers() {
 const [users, set]  = useState<User[]>([]);
 const [loading, l]  = useState(true);
 // Userliste laden
 const fetchUsers = async () => {
   l(true);
   const { data } = await ApiService.get<User[]>('/users');
   set(data);
   l(false);
 };
 // User löschen
 const deleteUser = async (id: string) => {
   await ApiService.delete(`/users/${id}`);
   set(prev => prev.filter(u => u.id !== id));
 };
// Initial Load
 useEffect(() => { fetchUsers(); }, []);
 return { users, loading, deleteUser, refetch: fetchUsers };
}