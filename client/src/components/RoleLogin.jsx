import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginHeroBanner } from './LoginHeroBanner';
import { WatercolorBackdrop } from './WatercolorBackdrop';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const roleMeta = {
  admin: {
    title: 'Admin Master Control',
    color: '#3b82f6',
    roleTag: 'administrator',
    placeholder: 'Enter admin username or email',
    folder: 'admin_folder',
  },
  salesman: {
    title: 'Field Sales & Dispatch',
    color: '#10b981',
    roleTag: 'field salesman',
    placeholder: 'Enter salesman username or email',
    folder: 'salesman_folder',
  },
  production: {
    title: 'Production Floor Supervisor',
    color: '#f59e0b',
    roleTag: 'production supervisor',
    placeholder: 'Enter supervisor username or email',
    folder: 'production_folder',
  },
  auditor: {
    title: 'Auditor & Accounts Ledger',
    color: '#8b5cf6',
    roleTag: 'read-only auditor',
    placeholder: 'Enter auditor username or email',
    folder: 'auditor_folder',
  },
  owner: {
    title: 'Executive Factory Dashboard',
    color: '#f43f5e',
    roleTag: 'factory owner',
    placeholder: 'Enter owner username or email',
    folder: 'owner_folder',
  },
};

export const RoleLogin = ({ targetRole }) => {
  const { login } = useAuth();
  const meta = roleMeta[targetRole] || {
    title: `${targetRole.toUpperCase()} Portal`,
    color: '#6366f1',
    roleTag: targetRole,
    placeholder: 'Enter username or email',
    folder: `${targetRole}_folder`,
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setForgotMsg('');
    setSubmitting(true);

    const result = await login(username, password, targetRole);
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotMsg('Password reset requested. Contact Factory IT administration to re-issue credentials.');
  };

  return (
    <div className="untitled-auth-viewport">
      {/* Scenic Watercolor Landscape Backdrop */}
      <WatercolorBackdrop />

      {/* Centered Floating Untitled UI Card Window */}
      <div className="untitled-floating-card">
        {/* Left Form Column (Deep Charcoal) */}
        <div className="untitled-form-col">
          {/* Top Brand Logo */}
          <div className="untitled-brand-row">
            <div className="untitled-logo-cube" style={{ color: meta.color }}>❖</div>
            <span className="untitled-brand-name">Untitled UI</span>
            <span className="untitled-role-badge" style={{ borderColor: `${meta.color}40`, color: meta.color }}>
              {meta.title}
            </span>
          </div>

          <div className="untitled-form-inner">
            {/* Error & Info Alerts */}
            {error && (
              <div className="untitled-alert error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
            {forgotMsg && (
              <div className="untitled-alert success">
                <CheckCircle2 size={14} />
                <span>{forgotMsg}</span>
              </div>
            )}

            <div className="untitled-text-header">
              <h1 className="untitled-title">Sign into your account</h1>
              <p className="untitled-subtitle">
                Access reserved strictly for <strong>{meta.roleTag}</strong> (Atlas: <code>{meta.folder}</code>).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="untitled-form-fields">
              <div className="untitled-field-group">
                <label>Username or Email</label>
                <input
                  type="text"
                  required
                  placeholder={meta.placeholder}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="untitled-text-input"
                  autoComplete="username"
                />
              </div>

              <div className="untitled-field-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="untitled-text-input"
                  autoComplete="current-password"
                />
              </div>

              <div className="untitled-meta-row">
                <button
                  type="button"
                  className="untitled-link-subtle"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="untitled-submit-btn"
                style={{ borderColor: `${meta.color}50` }}
              >
                <span>{submitting ? 'Verifying...' : 'Sign in'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Untitled UI Scenic Showcase with Floating Command Palette */}
        <LoginHeroBanner role={targetRole} />
      </div>
    </div>
  );
};
