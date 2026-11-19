import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Shield, Smartphone, Factory, ClipboardCheck, Briefcase } from 'lucide-react';

const roleMeta = {
  admin: {
    title: 'Admin Login',
    icon: Shield,
    color: '#4f46e5',
    themeClass: 'admin-theme',
    placeholder: 'admin',
  },
  salesman: {
    title: 'Salesman Login',
    icon: Smartphone,
    color: '#059669',
    themeClass: 'salesman-theme',
    placeholder: 'salesman',
  },
  production: {
    title: 'Production Login',
    icon: Factory,
    color: '#d97706',
    themeClass: 'prod-theme',
    placeholder: 'production',
  },
  auditor: {
    title: 'Auditor & Accounts Login',
    icon: ClipboardCheck,
    color: '#7c3aed',
    themeClass: 'audit-theme',
    placeholder: 'auditor',
  },
  owner: {
    title: 'Owner Login',
    icon: Briefcase,
    color: '#e11d48',
    themeClass: 'owner-theme',
    placeholder: 'owner',
  },
};

export const RoleLogin = ({ targetRole }) => {
  const meta = roleMeta[targetRole] || roleMeta.admin;
  const RoleIcon = meta.icon;
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Enforce targetRole rule on server
    const result = await login(username, password, targetRole);
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-card ${meta.themeClass}`}>
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-circle" style={{ background: `${meta.color}15` }}>
            <RoleIcon size={32} color={meta.color} />
          </div>
          <h2>{meta.title}</h2>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="error-box">
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                required
                placeholder={meta.placeholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{ background: meta.color }}
          >
            {submitting ? 'Verifying...' : `Sign In`}
          </button>
        </form>
      </div>
    </div>
  );
};
