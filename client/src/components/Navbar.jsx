import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Factory, 
  User, 
  Shield, 
  Smartphone, 
  ClipboardCheck, 
  Briefcase 
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  // Hide Navbar when not authenticated for clean full-screen split login UX
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleInfo = (roleName) => {
    switch (roleName) {
      case 'admin':
        return { label: 'Factory Admin', color: 'badge-admin', icon: Shield, path: '/admin' };
      case 'salesman':
        return { label: 'Field Salesman', color: 'badge-salesman', icon: Smartphone, path: '/salesman' };
      case 'production':
        return { label: 'Floor Supervisor', color: 'badge-prod', icon: Factory, path: '/production' };
      case 'auditor':
        return { label: 'Auditor (Read-Only)', color: 'badge-audit', icon: ClipboardCheck, path: '/auditor' };
      case 'owner':
        return { label: 'Factory Owner', color: 'badge-owner', icon: Briefcase, path: '/owner' };
      case 'user':
        return { label: 'Staff User', color: 'badge-default', icon: User, path: '/user' };
      default:
        return { label: roleName || 'Guest', color: 'badge-default', icon: User, path: '/login' };
    }
  };

  const roleInfo = getRoleInfo(role);
  const BadgeIcon = roleInfo.icon;

  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <Link to={roleInfo.path} className="navbar-brand" style={{ textDecoration: 'none' }}>
          <Factory className="brand-icon" size={26} />
          <div>
            <h1 className="brand-title">FoodFlow OMS</h1>
            <span className="brand-sub">NIT Tiruchirappalli Winter Internship 2026</span>
          </div>
        </Link>

        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className={`role-badge ${roleInfo.color}`}>
                <BadgeIcon size={12} />
                {roleInfo.label}
              </span>
            </div>
            <button onClick={handleLogout} className="btn-logout" title="Sign Out">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
