import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, User, Key, Lock, CheckCircle2, Factory, Smartphone, ClipboardCheck, BarChart3, Briefcase } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const testCredentials = [
    {
      role: 'Admin',
      roleKey: 'admin',
      name: 'Factory Admin',
      email: 'admin@factory.com',
      password: 'adminPassword123',
      desc: 'Verify orders, GST Invoices, Dispatch, Payments',
      icon: Shield,
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    },
    {
      role: 'Salesman',
      roleKey: 'salesman',
      name: 'Salesman A (Tamil Nadu)',
      email: 'salesman@factory.com',
      password: 'salesPassword123',
      desc: 'Mobile-first field ordering & status tracking',
      icon: Smartphone,
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    },
    {
      role: 'Production',
      roleKey: 'production',
      name: 'Floor Supervisor',
      email: 'production@factory.com',
      password: 'prodPassword123',
      desc: 'BOM recipe batches, RM purchases, wastage & yield',
      icon: Factory,
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-300',
    },
    {
      role: 'Auditor',
      roleKey: 'auditor',
      name: 'External Auditor',
      email: 'auditor@factory.com',
      password: 'auditPassword123',
      desc: 'Read-only Stock Ledger, Sales Register, GST report',
      icon: ClipboardCheck,
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    },
    {
      role: 'Owner',
      roleKey: 'owner',
      name: 'Factory Owner',
      email: 'owner@factory.com',
      password: 'ownerPassword123',
      desc: 'Cost/packet, variance alerts, cash dues, overview',
      icon: Briefcase,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-300',
    },
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleTestLogin = async (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
    setSubmitting(true);
    const result = await login(cred.email, cred.password);
    setSubmitting(false);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-circle">
            <Factory size={32} color="#4f46e5" />
          </div>
          <h2>Order-to-Audit System</h2>
          <p className="subtitle">Small Food Manufacturer Prototype • NIT Trichy 2026</p>
          <div className="srs-tag">SRS §3.1 Authentication & Role-Based Access</div>
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
            <label>Email Address</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="name@factory.com"
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

          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Evaluation Quick-Logins (FR-1.5) */}
        <div className="test-logins-section">
          <div className="divider-text">
            <span>Evaluation Panel 1-Click Test Logins (FR-1.5)</span>
          </div>

          <div className="test-buttons-grid">
            {testCredentials.map((cred) => {
              const IconComp = cred.icon;
              return (
                <button
                  key={cred.roleKey}
                  type="button"
                  className="test-role-btn"
                  onClick={() => handleTestLogin(cred)}
                >
                  <div className="test-role-header">
                    <span className="role-pill">
                      <IconComp size={14} />
                      {cred.role}
                    </span>
                    <span className="click-label">Click to Login</span>
                  </div>
                  <div className="test-role-email">{cred.email}</div>
                  <div className="test-role-desc">{cred.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
