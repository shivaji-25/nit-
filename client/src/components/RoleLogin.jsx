import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Lock, User, Shield, Smartphone, Factory, ClipboardCheck, Briefcase, AlertCircle, ArrowLeft } from 'lucide-react';

const roleMeta = {
  admin: {
    title: 'Factory Admin Portal',
    sub: 'Desk Verification, GST Invoicing & Dispatch',
    icon: Shield,
    themeClass: 'admin-theme',
    color: '#4f46e5',
    url: '/admin',
    desc: 'Only authorized Factory Admin credentials are accepted at this link.',
  },
  salesman: {
    title: 'Field Salesman Portal',
    sub: 'Mobile Order Placement & Sales Tracking',
    icon: Smartphone,
    themeClass: 'salesman-theme',
    color: '#059669',
    url: '/salesman',
    desc: 'Only field salesmen credentials are accepted at this link.',
  },
  production: {
    title: 'Production Floor Portal',
    sub: 'Recipe BOM Runs, RM Purchases & Output',
    icon: Factory,
    themeClass: 'prod-theme',
    color: '#d97706',
    url: '/production',
    desc: 'Only floor supervisors and production staff are accepted at this link.',
  },
  auditor: {
    title: 'Auditor & Accountant Portal',
    sub: 'Read-Only Stock Ledger & Tax Compliance',
    icon: ClipboardCheck,
    themeClass: 'audit-theme',
    color: '#7c3aed',
    url: '/auditor',
    desc: 'Only authorized auditors and accountants are accepted at this link.',
  },
  owner: {
    title: 'Factory Owner Portal',
    sub: 'Executive Overview, Costing & Variance Insights',
    icon: Briefcase,
    themeClass: 'owner-theme',
    color: '#e11d48',
    url: '/owner',
    desc: 'Only factory executive / owner credentials are accepted at this link.',
  },
};

export const RoleLogin = ({ targetRole }) => {
  const meta = roleMeta[targetRole] || roleMeta.admin;
  const RoleIcon = meta.icon;
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Enforce requiredRole rule on login call
    const result = await login(email, password, targetRole);
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-card ${meta.themeClass}`}>
        {/* Back to Gateway */}
        <div style={{ marginBottom: '16px' }}>
          <Link to="/login" className="back-link">
            <ArrowLeft size={16} />
            <span>All Category Portals Gateway</span>
          </Link>
        </div>

        {/* Header */}
        <div className="login-header">
          <div className="login-logo-circle" style={{ background: `${meta.color}15` }}>
            <RoleIcon size={32} color={meta.color} />
          </div>
          <h2>{meta.title}</h2>
          <p className="subtitle">{meta.sub}</p>
          <div className="role-rule-pill">
            <AlertCircle size={14} color={meta.color} />
            <span>Strict Rule: Only <strong>{targetRole.toUpperCase()}</strong> accounts can log in here</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="error-box">
            <span>{error}</span>
          </div>
        )}

        {/* Category Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>{meta.title} Email</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder={`${targetRole}@factory.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {submitting ? 'Verifying Role & Signing In...' : `Sign In to ${meta.title}`}
          </button>
        </form>

        <div className="login-footer-info">
          <p>
            Current Link: <code>http://localhost:5173{meta.url}</code>
          </p>
          <p className="hint-text">{meta.desc}</p>
        </div>
      </div>
    </div>
  );
};
