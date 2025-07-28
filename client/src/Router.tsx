import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AppShell from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AssetDetailPage from './pages/AssetDetailPage';
import CreateAssetPage from './pages/AddAssetPage';
import AssetEditPage from './pages/AssetEditPage';
import UserManagementPage from './pages/UserManagementPage';
import AssetListPage from './pages/AssetListPage'; // ✅ NEU importiert
import type { ReactNode } from 'react';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

const ProtectedLayout = () => (
  <PrivateRoute>
    <AppShell>
      <Outlet />
    </AppShell>
  </PrivateRoute>
);

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ───────── Öffentliche Routen ───────── */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ───────── Geschützte Routen ───────── */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/asset/new" element={<CreateAssetPage />} />
            <Route path="/asset/:id" element={<AssetDetailPage />} />
            <Route path="/asset/:id/edit" element={<AssetEditPage />} />
            <Route path="/users" element={<UserManagementPage />} />

            {/* ✅ Neue Route für die Asset-Liste */}
            <Route path="/assets-list" element={<AssetListPage />} />

            {/* Default innerhalb des AppShell → Dashboard */}
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>

          {/* ───────── Fallback ───────── */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
