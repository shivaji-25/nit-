import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrandEmblem } from './BrandEmblem';
import { LoginHeroBanner } from './LoginHeroBanner';
import { ArrowRight, AlertCircle, Shield, Smartphone, Factory, ClipboardCheck, Briefcase } from 'lucide-react';

const roleMeta = {
  admin: {
    title: 'Admin Portal',
    roleTag: 'Administrator',
    icon: Shield,
    color: '#4f46e5',
    placeholder: 'admin',
  },
  salesman: {
    title: 'Salesman Portal',
    roleTag: 'Field Sales',
    icon: Smartphone,
    color: '#059669',
    placeholder: 'salesman',
  },
  production: {
    title: 'Production Portal',
    roleTag: 'Floor Supervisor',
    icon: Factory,
    color: '#d97706',
    placeholder: 'production',
  },
  auditor: {
    title: 'Auditor & Accounts',
    roleTag: 'Auditor & Accounts',
    icon: ClipboardCheck,
    color: '#7c3aed',
    placeholder: 'auditor',
  },
  owner: {
    title: 'Owner Portal',
    roleTag: 'Factory Owner',
    icon: Briefcase,
    color: '#e11d48',
    placeholder: 'owner',
  },
};

export const RoleLogin = ({ targetRole }) => {
  const meta = roleMeta[targetRole] || roleMeta.admin;
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('Contact the factory IT administrator to reset role access credentials.');
  };

  return (
    <div className="auth-split-wrapper">
      {/* Left Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-box">
          {/* Brand Emblem Logo */}
          <div className="auth-brand-header">
            <BrandEmblem size={44} />
            <h1 className="auth-heading">Welcome Back !</h1>
            <p className="auth-subheading">
              Please enter your {meta.roleTag} credentials to sign in
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="auth-alert-box error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-modern-form">
            <div className="auth-input-group">
              <label>Username</label>
              <input
                type="text"
                required
                placeholder={meta.placeholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input-field"
                autoComplete="username"
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input-field"
                autoComplete="current-password"
              />
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={handleForgotPassword}
                className="auth-forgot-link"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="auth-primary-btn"
              style={{ background: meta.color }}
            >
              <span>{submitting ? 'Verifying...' : 'Login'}</span>
              <ArrowRight size={18} />
            </button>

            {/* Terms disclaimer */}
            <p className="auth-terms-note">
              Authorized personnel only. Access is cryptographically monitored and logged.
            </p>

            {/* Link to standard User login */}
            <div className="auth-footer-link">
              <span>Standard staff member? </span>
              <Link to="/login" className="auth-link-btn" style={{ textDecoration: 'none' }}>
                User Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Hero Banner Panel with Pure Lightweight Animated Card */}
      <LoginHeroBanner role={targetRole} />
    </div>
  );
};
