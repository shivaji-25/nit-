import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Smartphone, ShoppingBag, Clock, Users, CheckCircle2 } from 'lucide-react';

export const SalesmanPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('order');

  return (
    <div className="portal-container">
      <div className="portal-header salesman-theme">
        <div className="portal-header-left">
          <div className="portal-icon-box">
            <Smartphone size={28} color="#059669" />
          </div>
          <div>
            <h2>Field Salesman Portal</h2>
            <p>Welcome back, {user?.name} • Mobile-First Field Ordering</p>
          </div>
        </div>
        <div className="url-indicator">
          <code>http://localhost:5173/salesman</code>
        </div>
      </div>

      {/* Salesman Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => setActiveTab('order')}
        >
          <ShoppingBag size={16} />
          <span>New Order Entry &lt; 1 min (FR-3.1, 3.6)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'my_orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('my_orders')}
        >
          <Clock size={16} />
          <span>My Orders & Status (FR-3.4)</span>
        </button>
        <button
          className={`portal-tab ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          <Users size={16} />
          <span>Customer Sales (FR-3.4)</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="portal-body">
        <div className="section-card">
          <div className="section-card-header">
            <h3>Salesman Active Screen: <span className="highlight-tab">{activeTab}</span></h3>
            <span className="badge-ready">SRS §3.3 Mobile-First</span>
          </div>
          <div className="portal-intro-card">
            <div className="intro-badge">
              <CheckCircle2 size={16} color="#059669" />
              <span>Salesman Privileges Active</span>
            </div>
            <p>
              This screen is tailored for the <strong>Salesman</strong> on mobile devices with large touch targets.
              You select a retailer/distributor, select products with auto-filled prices from the price list, and submit orders directly to the factory without phone calls or WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
