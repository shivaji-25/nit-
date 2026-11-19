import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, TrendingUp, AlertOctagon, IndianRupee, CheckCircle2 } from 'lucide-react';

export const OwnerPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="portal-container">
      <div className="portal-header owner-theme">
        <div className="portal-header-left">
          <div className="portal-icon-box">
            <Briefcase size={28} color="#e11d48" />
          </div>
          <div>
            <h2>Factory Owner Executive Portal</h2>
            <p>Welcome back, {user?.name} • Business Overview & Costing Insights</p>
          </div>
        </div>
        <div className="url-indicator">
          <code>http://localhost:5173/owner</code>
        </div>
      </div>

      {/* Owner Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp size={16} />
          <span>Today's Business & Orders (FR-12.1)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'costing' ? 'active' : ''}`}
          onClick={() => setActiveTab('costing')}
        >
          <IndianRupee size={16} />
          <span>Cost Per Packet & Margin (FR-10.3)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <AlertOctagon size={16} />
          <span>Yield & Wastage Alerts &gt; 3% (FR-8.6)</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="portal-body">
        <div className="section-card">
          <div className="section-card-header">
            <h3>Executive Active Screen: <span className="highlight-tab">{activeTab}</span></h3>
            <span className="badge-ready">SRS §3.12 Owner Dashboard</span>
          </div>
          <div className="portal-intro-card">
            <div className="intro-badge">
              <CheckCircle2 size={16} color="#e11d48" />
              <span>Owner Privileges Active</span>
            </div>
            <p>
              This screen provides high-level factory visibility for the <strong>Owner</strong>.
              Monitor batch yield efficiency, real-time packet production cost, margin health vs Rs 50 selling price,
              and customer collection ageing from any device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
