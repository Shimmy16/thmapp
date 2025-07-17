// AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
/* ---------- Layout & Pages ---------- */
import AppShell          from './components/layout/AppShell';
import DashboardPage     from './pages/DashboardPage';
import LoginPage         from './pages/LoginPage';
import RegisterPage      from './pages/RegisterPage';
import AssetDetailPage   from './pages/AssetDetailPage';
import CreateAssetPage   from './pages/AddAssetPage';
import AssetEditPage     from './pages/AssetEditPage';
import UserManagementPage from './pages/UserManagementPage';
import type { ReactNode } from 'react';

/* ---------- Guard ---------- */
function PrivateRoute({ children }: { children: ReactNode })  {
 const { user } = useAuth();
 return user ? children : <Navigate to="/login" replace />;
}
/* ---------- Layout-Wrapper für geschützte Routen ---------- */
const ProtectedLayout = () => (
<PrivateRoute>
<AppShell>
<Outlet />          {/* hier werden Child-Routes gerendert */}
</AppShell>
</PrivateRoute>
);
/* ---------- Router ---------- */
export default function AppRouter() {
 return (
<AuthProvider>
<BrowserRouter>
<Routes>
         {/* ───────── Öffentliche Routen ───────── */}
<Route path="/login"    element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
         {/* ───────── Geschützte Routen ───────── */}
<Route element={<ProtectedLayout />}>
<Route path="/dashboard"       element={<DashboardPage />} />
<Route path="/asset/new"       element={<CreateAssetPage />} />
<Route path="/asset/:id"       element={<AssetDetailPage />} />
<Route path="/asset/:id/edit"  element={<AssetEditPage />} />
<Route path="/users"           element={<UserManagementPage />} />
           {/* Default innerhalb des AppShell → Dashboard */}
<Route index element={<Navigate to="/dashboard" />} />
</Route>
         {/* ───────── Fallback (außerhalb) ───────── */}
<Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>
</BrowserRouter>
</AuthProvider>
 );
}