import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Factory, 
  FileText, 
  ClipboardCheck, 
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const Dashboard = ({ activeTab }) => {
  const { user, role } = useAuth();

  return (
    <div className="dashboard-content">
      {/* Role Verification Banner */}
      <div className="role-welcome-card">
        <div className="welcome-header">
          <div className="welcome-avatar">
            {role === 'salesman' && <Smartphone size={28} color="#059669" />}
            {role === 'admin' && <ShieldCheck size={28} color="#4f46e5" />}
            {role === 'production' && <Factory size={28} color="#d97706" />}
            {role === 'auditor' && <ClipboardCheck size={28} color="#7c3aed" />}
            {role === 'owner' && <Briefcase size={28} color="#e11d48" />}
          </div>
          <div>
            <h2>Welcome, {user?.name}!</h2>
            <p className="welcome-subtitle">
              Logged in as <strong className="capitalize">{role}</strong> • Token-authenticated session (FR-1.4)
            </p>
          </div>
        </div>

        <div className="role-permissions-box">
          <div className="perm-header">
            <CheckCircle2 size={16} color="#10b981" />
            <span>Role-Based Access Enforcement (SRS §3.1 FR-1.3):</span>
          </div>
          <p className="perm-desc">
            {role === 'salesman' &&
              'You have Mobile-First Field Sales permissions: Create orders in < 1 min, view submitted orders, customer sales. Restricted from Admin approval, invoices, and production floors.'}
            {role === 'admin' &&
              'You have Factory Admin permissions: Review incoming orders, stock checks, approve/reject, generate sequential GST invoices (PDF), record dispatch & customer payments.'}
            {role === 'production' &&
              'You have Production Floor Supervisor permissions: Log raw material purchases, record BOM batches, enter actual outputs, and track packaging/flour wastage.'}
            {role === 'auditor' &&
              'You have Read-Only Auditor/Accountant permissions: View stock ledger movements, customer ageing receivables, GSTR-1 outward summaries. Form inputs are disabled for audit compliance.'}
            {role === 'owner' &&
              'You have Executive Overview permissions: View high-level metrics, daily orders, stock valuation, variance flags (>3%), cost per packet and outstanding dues.'}
          </p>
        </div>
      </div>

      {/* Tab Context Container */}
      <div className="section-card">
        <div className="section-card-header">
          <h3>Active View: <span className="highlight-tab">{activeTab}</span></h3>
          <span className="badge-ready">Ready for Module Implementation</span>
        </div>
        <div className="section-placeholder">
          <p>
            You are viewing the view assigned to your role (<strong>{role}</strong>). 
            Navigation is strictly restricted to authorized screens in compliance with <strong>FR-1.3</strong>.
          </p>
          <div className="quick-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Role:</span>
              <span className="spec-val uppercase">{role}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Auth Protocol:</span>
              <span className="spec-val">JWT (Expiring 7d)</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Password Storage:</span>
              <span className="spec-val">Salted bcrypt hash</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Evaluation Test Mode:</span>
              <span className="spec-val text-green">Active (FR-1.5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
