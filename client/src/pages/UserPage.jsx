import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, ClipboardList, CheckCircle2, Shield } from 'lucide-react';

export const UserPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="portal-container">
      <div className="portal-header admin-theme">
        <div className="portal-header-left">
          <div className="portal-icon-box">
            <User size={28} color="#4f46e5" />
          </div>
          <div>
            <h2>Standard User Portal</h2>
            <p>Welcome back, {user?.name} • General Staff Access</p>
          </div>
        </div>
        <div className="url-indicator">
          <code>http://localhost:5173/user</code>
        </div>
      </div>

      {/* User Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <ClipboardList size={16} />
          <span>My Profile & Session</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="portal-body">
        <div className="section-card">
          <div className="section-card-header">
            <h3>User Screen: <span className="highlight-tab">{activeTab}</span></h3>
            <span className="badge-ready">Data stored in user_folder</span>
          </div>
          <div className="portal-intro-card">
            <div className="intro-badge">
              <CheckCircle2 size={16} color="#4f46e5" />
              <span>User Folder Data Isolated</span>
            </div>
            <p>
              Your account details and activity are strictly stored inside the <strong>user_folder</strong> collection in MongoDB Atlas.
              Other roles (admin, salesman, production, auditor, owner) are stored in their own separate collection folders.
            </p>
            <div className="quick-specs-grid" style={{ marginTop: '16px' }}>
              <div className="spec-item">
                <span className="spec-label">Username:</span>
                <span className="spec-val">{user?.username}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Role:</span>
                <span className="spec-val uppercase">{user?.role}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Storage Collection:</span>
                <span className="spec-val">user_folder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
