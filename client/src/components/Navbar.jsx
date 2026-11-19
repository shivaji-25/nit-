import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Factory, 
  User, 
  Shield, 
  Smartphone, 
  ClipboardCheck, 
  Briefcase,
  FileText,
  Boxes,
  ShoppingCart,
  TrendingUp
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout, role } = useAuth();

  const getRoleBadge = (roleName) => {
    switch (roleName) {
      case 'admin':
        return { label: 'Admin Desk', color: 'badge-admin', icon: Shield };
      case 'salesman':
        return { label: 'Field Salesman', color: 'badge-salesman', icon: Smartphone };
      case 'production':
        return { label: 'Floor Supervisor', color: 'badge-prod', icon: Factory };
      case 'auditor':
        return { label: 'Auditor (Read-Only)', color: 'badge-audit', icon: ClipboardCheck };
      case 'owner':
        return { label: 'Factory Owner', color: 'badge-owner', icon: Briefcase };
      default:
        return { label: roleName, color: 'badge-default', icon: User };
    }
  };

  const badgeInfo = getRoleBadge(role);
  const BadgeIcon = badgeInfo.icon;

  // Role-specific allowed navigation tabs (FR-1.3 & SRS Section 4.1)
  const getNavTabs = () => {
    switch (role) {
      case 'salesman':
        return [
          { id: 'mobile_order', label: '📱 Place Order (< 1 min)', icon: Smartphone },
          { id: 'my_orders', label: '📋 My Orders & Status', icon: FileText },
          { id: 'customer_sales', label: '👥 Customer Sales', icon: TrendingUp },
        ];
      case 'admin':
        return [
          { id: 'verify_orders', label: '🔍 Verify Orders & Stock', icon: ClipboardCheck },
          { id: 'gst_invoices', label: '📄 GST Invoices (PDF)', icon: FileText },
          { id: 'dispatch_payments', label: '🚚 Dispatch & Payments', icon: Boxes },
          { id: 'masters', label: '⚙️ Masters (BOM, Items, Customers)', icon: Shield },
        ];
      case 'production':
        return [
          { id: 'purchases', label: '📥 Raw Material Purchases', icon: ShoppingCart },
          { id: 'production_runs', label: '🥣 Production Runs (BOM)', icon: Factory },
          { id: 'stock_ledger', label: '📦 Stock Ledger & Wastage', icon: Boxes },
        ];
      case 'auditor':
        return [
          { id: 'reports_sales', label: '📊 Sales & GST Register', icon: FileText },
          { id: 'reports_stock', label: '📦 Stock Ledger Audit', icon: Boxes },
          { id: 'reports_receivables', label: '💰 Customer Ageing Receivables', icon: TrendingUp },
        ];
      case 'owner':
        return [
          { id: 'owner_dashboard', label: '📈 Executive Dashboard', icon: Briefcase },
          { id: 'variance_alerts', label: '⚠️ Variance Alerts (>3%)', icon: ClipboardCheck },
          { id: 'cost_packet', label: '💵 Cost Per Packet & Margin', icon: TrendingUp },
        ];
      default:
        return [];
    }
  };

  const tabs = getNavTabs();

  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <div className="navbar-brand">
          <Factory className="brand-icon" size={26} />
          <div>
            <h1 className="brand-title">FoodFlow OMS</h1>
            <span className="brand-sub">NIT Tiruchirappalli Winter Internship 2026</span>
          </div>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className={`role-badge ${badgeInfo.color}`}>
              <BadgeIcon size={12} />
              {badgeInfo.label}
            </span>
          </div>
          <button onClick={logout} className="btn-logout" title="Sign Out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Screen/Role Restricted Navigation Bar (FR-1.3) */}
      <nav className="navbar-nav">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
