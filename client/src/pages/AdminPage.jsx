import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ClipboardList, FileCheck, Truck, Database, CheckCircle2 } from 'lucide-react';

export const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('verify');

  return (
    <div className="portal-container">
      <div className="portal-header admin-theme">
        <div className="portal-header-left">
          <div className="portal-icon-box">
            <ShieldCheck size={28} color="#4f46e5" />
          </div>
          <div>
            <h2>Factory Admin Portal</h2>
            <p>Welcome back, {user?.name} • Desk Management & Approvals</p>
          </div>
        </div>
        <div className="url-indicator">
          <code>http://localhost:5173/admin</code>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          <ClipboardList size={16} />
          <span>Verify Orders & Stock Check (FR-4)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'invoices' ? 'active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          <FileCheck size={16} />
          <span>GST Invoicing (FR-5)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'dispatch' ? 'active' : ''}`}
          onClick={() => setActiveTab('dispatch')}
        >
          <Truck size={16} />
          <span>Dispatch & Payments (FR-6)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'masters' ? 'active' : ''}`}
          onClick={() => setActiveTab('masters')}
        >
          <Database size={16} />
          <span>Masters Data (FR-2)</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="portal-body">
        <div className="section-card">
          <div className="section-card-header">
            <h3>Admin Active Screen: <span className="highlight-tab">{activeTab}</span></h3>
            <span className="badge-ready">SRS §3.4 / §3.5 Enforced</span>
          </div>
          <div className="portal-intro-card">
            <div className="intro-badge">
              <CheckCircle2 size={16} color="#4f46e5" />
              <span>Admin Privileges Active</span>
            </div>
            <p>
              This screen is restricted exclusively to the <strong>Factory Admin</strong> role.
              Here you verify incoming salesmen orders against real-time finished goods stock, approve/reject orders, 
              generate sequential GST invoices in integer paise, and record dispatches and customer collections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
