import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminPage } from './pages/AdminPage';
import { SalesmanPage } from './pages/SalesmanPage';
import { ProductionPage } from './pages/ProductionPage';
import { AuditorPage } from './pages/AuditorPage';
import { OwnerPage } from './pages/OwnerPage';

// Smart root redirector based on authenticated user's role
const RoleRedirect = () => {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading application session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'salesman':
      return <Navigate to="/salesman" replace />;
    case 'production':
      return <Navigate to="/production" replace />;
    case 'auditor':
      return <Navigate to="/auditor" replace />;
    case 'owner':
      return <Navigate to="/owner" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-container">
        <Routes>
          {/* User Login Only */}
          <Route path="/login" element={<Login />} />
          <Route path="/Login" element={<Navigate to="/login" replace />} />

          {/* Root Redirect to Role Portal */}
          <Route path="/" element={<RoleRedirect />} />

          {/* Admin Login & Portal Only */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Admin/*" element={<Navigate to="/admin" replace />} />

          {/* Salesman Login & Portal Only */}
          <Route
            path="/salesman/*"
            element={
              <ProtectedRoute allowedRoles={['salesman']}>
                <SalesmanPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Salesman/*" element={<Navigate to="/salesman" replace />} />
          <Route path="/saleman/*" element={<Navigate to="/salesman" replace />} />

          {/* Production Floor Login & Portal Only */}
          <Route
            path="/production/*"
            element={
              <ProtectedRoute allowedRoles={['production']}>
                <ProductionPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Production/*" element={<Navigate to="/production" replace />} />

          {/* Auditor & Accounts Login & Portal Only */}
          <Route
            path="/auditor/*"
            element={
              <ProtectedRoute allowedRoles={['auditor']}>
                <AuditorPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Auditor/*" element={<Navigate to="/auditor" replace />} />

          {/* Owner Login & Portal Only */}
          <Route
            path="/owner/*"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <OwnerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Owner/*" element={<Navigate to="/owner" replace />} />
          <Route path="/owener/*" element={<Navigate to="/owner" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
