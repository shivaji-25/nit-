import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RoleLogin } from './RoleLogin';
import { ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, loading, role, user, logout } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Verifying credentials & role permissions...</p>
      </div>
    );
  }

  // If not logged in, render the dedicated category login form for this link directly!
  if (!isAuthenticated) {
    return <RoleLogin targetRole={allowedRoles[0]} />;
  }

  // If logged in, but role does NOT match this link's required role
  if (allowedRoles && !allowedRoles.includes(role)) {
    const roleRoutes = {
      admin: '/admin',
      salesman: '/salesman',
      production: '/production',
      auditor: '/auditor',
      owner: '/owner',
    };
    const targetRoute = roleRoutes[role] || '/login';
    const targetRequired = allowedRoles[0];

    return (
      <div className="unauthorized-container">
        <div className="unauthorized-card">
          <ShieldAlert size={48} color="#ef4444" />
          <h2>403 - Role Rule Violation</h2>
          <p>
            You are currently logged in as <strong className="capitalize">{role}</strong> ({user?.name}).
          </p>
          <p style={{ color: '#dc2626', fontWeight: 600 }}>
            This link is strictly reserved for the {targetRequired.toUpperCase()} category.
          </p>
          <div className="unauthorized-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <Link to={targetRoute} className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <span>Go to Your {role.toUpperCase()} Portal</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={logout}
              style={{
                background: 'transparent',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              Sign out from {user?.email}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
