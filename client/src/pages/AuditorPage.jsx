import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ClipboardCheck, FileSpreadsheet, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

export const AuditorPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('stock_ledger');

  return (
    <div className="portal-container">
      <div className="portal-header audit-theme">
        <div className="portal-header-left">
          <div className="portal-icon-box">
            <ClipboardCheck size={28} color="#7c3aed" />
          </div>
          <div>
            <h2>Auditor & Accountant Portal</h2>
            <p>Welcome back, {user?.name} • Read-Only Compliance & Ledger Audit</p>
          </div>
        </div>
        <div className="url-indicator">
          <code>http://localhost:5173/auditor</code>
        </div>
      </div>

      {/* Auditor Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'stock_ledger' ? 'active' : ''}`}
          onClick={() => setActiveTab('stock_ledger')}
        >
          <BookOpen size={16} />
          <span>Stock Ledger Audit (FR-9.3, 11.2)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'sales_register' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales_register')}
        >
          <FileSpreadsheet size={16} />
          <span>Sales & GST Summary (GSTR-1/3B) (FR-11.1, 11.3)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'receivables' ? 'active' : ''}`}
          onClick={() => setActiveTab('receivables')}
        >
          <Clock size={16} />
          <span>Customer Ageing Receivables (FR-11.6)</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="portal-body">
        <div className="section-card">
          <div className="section-card-header">
            <h3>Auditor Active Screen: <span className="highlight-tab">{activeTab}</span></h3>
            <span className="badge-ready">SRS §3.11 Read-Only Audit</span>
          </div>
          <div className="portal-intro-card">
            <div className="intro-badge">
              <CheckCircle2 size={16} color="#7c3aed" />
              <span>Auditor Privileges Active (Read-Only)</span>
            </div>
            <p>
              This screen provides <strong>Read-Only</strong> access for the external accountant and auditor.
              Every stock movement is traced to its source document (purchase, production run, invoice, or adjustment).
              All numbers can be filtered by date range and exported to Excel/CSV and PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
