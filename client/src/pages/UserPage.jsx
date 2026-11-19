import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EcommerceDashboard } from '../components/EcommerceDashboard';
import { ShoppingBag, User, Database, ShieldCheck, Lock } from 'lucide-react';

export const UserPage = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('store'); // 'store' | 'account'

  return (
    <div className="user-page-wrapper">
      {/* Top Quick Bar for User Portal */}
      <div className="user-portal-subnav">
        <div className="user-portal-subnav-inner">
          <div className="subnav-left">
            <span className="subnav-pill active-pill">
              <span className="subnav-beacon" />
              <span>NIT Winter 2026 • FoodFlow Next-Gen</span>
            </span>
          </div>

          <div className="subnav-tabs">
            <button
              type="button"
              className={`subnav-tab-btn ${activeView === 'store' ? 'active' : ''}`}
              onClick={() => setActiveView('store')}
            >
              <ShoppingBag size={14} />
              <span>Gourmet E-Commerce Catalogue</span>
            </button>
            <button
              type="button"
              className={`subnav-tab-btn ${activeView === 'account' ? 'active' : ''}`}
              onClick={() => setActiveView('account')}
            >
              <User size={14} />
              <span>Account & Atlas Storage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      {activeView === 'store' ? (
        <EcommerceDashboard />
      ) : (
        <div className="portal-container" style={{ paddingTop: '20px' }}>
          <div className="section-card">
            <div className="section-card-header">
              <h3>User Security & Isolation Profile</h3>
              <span className="badge-ready">Storage: user_folder</span>
            </div>
            <div className="portal-intro-card">
              <div className="intro-badge">
                <ShieldCheck size={16} color="#10b981" />
                <span>MongoDB Atlas Collection Isolation Active</span>
              </div>
              <p>
                Your account credentials and order history are strictly stored inside the <strong>user_folder</strong> collection in MongoDB Atlas under <code>food_mfg_db</code>.
                Cross-role boundaries enforce strict 403 access control against admin, salesman, production, auditor, and owner directories.
              </p>
              <div className="quick-specs-grid" style={{ marginTop: '16px' }}>
                <div className="spec-item">
                  <span className="spec-label">User Name:</span>
                  <span className="spec-val">{user?.name}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Email / Identifier:</span>
                  <span className="spec-val">{user?.email || user?.username}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Role Category:</span>
                  <span className="spec-val uppercase">{user?.role}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">MongoDB Atlas Target:</span>
                  <span className="spec-val" style={{ color: '#10b981', fontWeight: 700 }}>user_folder</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Financial Unit Standard:</span>
                  <span className="spec-val">Integer Paise (FR-1.5)</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Encryption:</span>
                  <span className="spec-val">AES-256 + JWT (7d)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
