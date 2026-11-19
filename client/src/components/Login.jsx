import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Factory, 
  Shield, 
  Smartphone, 
  ClipboardCheck, 
  Briefcase, 
  ArrowRight, 
  Lock, 
  User, 
  AlertCircle 
} from 'lucide-react';

const categories = [
  {
    role: 'admin',
    title: 'Factory Admin',
    desc: 'Desk Verification, GST Tax Invoices & Dispatches',
    path: '/admin',
    icon: Shield,
    color: '#4f46e5',
    tag: 'Admin Portal',
  },
  {
    role: 'salesman',
    title: 'Field Salesman',
    desc: 'Mobile Ordering (< 1 min) & Customer Sales',
    path: '/salesman',
    icon: Smartphone,
    color: '#059669',
    tag: 'Salesman Portal',
  },
  {
    role: 'production',
    title: 'Floor Supervisor',
    desc: 'BOM Recipes, Output Batches & RM Purchases',
    path: '/production',
    icon: Factory,
    color: '#d97706',
    tag: 'Production Portal',
  },
  {
    role: 'auditor',
    title: 'Auditor & Accounts',
    desc: 'Read-Only Stock Ledger, GSTR-1 & Sales Registers',
    path: '/auditor',
    icon: ClipboardCheck,
    color: '#7c3aed',
    tag: 'Auditor Portal',
  },
  {
    role: 'owner',
    title: 'Factory Owner',
    desc: 'Executive Metrics, Cost Per Packet & Dues',
    path: '/owner',
    icon: Briefcase,
    color: '#e11d48',
    tag: 'Owner Portal',
  },
];

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const currentCategory = categories.find((c) => c.role === selectedRole) || categories[0];
  const CurrentIcon = currentCategory.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Enforce requiredRole rule
    const result = await login(email, password, selectedRole);
    setSubmitting(false);

    if (result.success) {
      navigate(currentCategory.path);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="gateway-container">
      {/* Gateway Header */}
      <div className="gateway-header">
        <div className="login-logo-circle">
          <Factory size={32} color="#4f46e5" />
        </div>
        <h2>Order-to-Audit Factory Portals</h2>
        <p className="subtitle">
          Small Food Manufacturer Prototype • NIT Tiruchirappalli 2026
        </p>
        <p className="gateway-note">
          Each category has its own dedicated portal link. Pick your category below or open its direct link.
        </p>
      </div>

      <div className="gateway-layout">
        {/* Left Column: Direct Category Portal Links */}
        <div className="category-cards-col">
          <h3 className="col-heading">Dedicated Category Links</h3>
          <div className="category-links-list">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = selectedRole === cat.role;
              return (
                <div
                  key={cat.role}
                  className={`category-item-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedRole(cat.role);
                    setError('');
                  }}
                >
                  <div className="cat-icon-wrap" style={{ background: `${cat.color}15` }}>
                    <CatIcon size={22} color={cat.color} />
                  </div>
                  <div className="cat-details">
                    <div className="cat-title-row">
                      <strong>{cat.title}</strong>
                      <span className="cat-tag" style={{ color: cat.color }}>{cat.tag}</span>
                    </div>
                    <span className="cat-path">http://localhost:5173{cat.path}</span>
                    <p className="cat-desc">{cat.desc}</p>
                  </div>
                  <Link
                    to={cat.path}
                    className="direct-link-btn"
                    title={`Go directly to ${cat.path}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Open</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Category-Enforced Login Form */}
        <div className="login-col">
          <div className="category-login-box" style={{ borderTop: `4px solid ${currentCategory.color}` }}>
            <div className="box-header">
              <div className="box-icon" style={{ background: `${currentCategory.color}15` }}>
                <CurrentIcon size={24} color={currentCategory.color} />
              </div>
              <div>
                <h3>{currentCategory.title} Sign In</h3>
                <span className="category-rule-text">
                  Enforcing: <code>requiredRole = "{selectedRole}"</code>
                </span>
              </div>
            </div>

            <div className="category-rule-alert">
              <AlertCircle size={15} color={currentCategory.color} />
              <span>Only accounts with the <strong>{selectedRole.toUpperCase()}</strong> role will be granted access here.</span>
            </div>

            {error && (
              <div className="error-box">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>{currentCategory.title} Email</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="email"
                    required
                    placeholder={`${selectedRole}@factory.com`}
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
                style={{ background: currentCategory.color }}
              >
                {submitting ? 'Verifying Category Rule...' : `Login to ${currentCategory.title}`}
              </button>
            </form>

            <div className="direct-link-footer">
              <span>Direct Link: </span>
              <Link to={currentCategory.path} style={{ color: currentCategory.color, fontWeight: 600 }}>
                http://localhost:5173{currentCategory.path}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
