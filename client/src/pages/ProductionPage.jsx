import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Factory, ShoppingCart, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ProductionPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('runs');

  return (
    <div className="portal-container">
      <div className="portal-header prod-theme">
        <div className="portal-header-left">
          <div className="portal-icon-box">
            <Factory size={28} color="#d97706" />
          </div>
          <div>
            <h2>Production Floor Portal</h2>
            <p>Welcome back, {user?.name} • Floor Supervisor & Recipe Control</p>
          </div>
        </div>
        <div className="url-indicator">
          <code>http://localhost:5173/production</code>
        </div>
      </div>

      {/* Production Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'runs' ? 'active' : ''}`}
          onClick={() => setActiveTab('runs')}
        >
          <Layers size={16} />
          <span>Production Runs & BOM Recipe (FR-8)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'purchases' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchases')}
        >
          <ShoppingCart size={16} />
          <span>RM & Packaging Purchases (FR-7)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'wastage' ? 'active' : ''}`}
          onClick={() => setActiveTab('wastage')}
        >
          <AlertTriangle size={16} />
          <span>Wastage & Variance Flags (FR-8.5, 8.6)</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="portal-body">
        <div className="section-card">
          <div className="section-card-header">
            <h3>Production Active Screen: <span className="highlight-tab">{activeTab}</span></h3>
            <span className="badge-ready">SRS §3.8 Highest Weight Evaluation</span>
          </div>
          <div className="portal-intro-card">
            <div className="intro-badge">
              <CheckCircle2 size={16} color="#d97706" />
              <span>Production Supervisor Privileges Active</span>
            </div>
            <p>
              This screen is designed for the <strong>Production Supervisor</strong> on floor tablets or desktop.
              Saving a run automatically updates the Stock Ledger (decreasing flour, cooking oil, spices, pouches, cartons and increasing finished goods packets).
              All variances beyond 3% are flagged automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
