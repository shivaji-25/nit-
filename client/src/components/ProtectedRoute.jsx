import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, loading, role, user } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Verifying credentials & role permissions...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const roleRoutes = {
      admin: '/admin',
      salesman: '/salesman',
      production: '/production',
      auditor: '/auditor',
      owner: '/owner',
    };
    const targetRoute = roleRoutes[role] || '/login';

    return (
      <div className="unauthorized-container">
        <div className="unauthorized-card">
          <ShieldAlert size={48} color="#ef4444" />
          <h2>403 - Access Denied</h2>
          <p>
            Your current role is <strong>{role}</strong> ({user?.name}). You do not have permission to view this section.
          </p>
          <div className="unauthorized-actions">
            <Link to={targetRoute} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>Go to Your {role.toUpperCase()} Portal</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
