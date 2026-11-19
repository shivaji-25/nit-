import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';

const MainApp = () => {
  const { isAuthenticated, loading, role } = useAuth();
  const [activeTab, setActiveTab] = useState('');

  // Set default active tab based on role
  useEffect(() => {
    if (role === 'salesman') setActiveTab('mobile_order');
    else if (role === 'admin') setActiveTab('verify_orders');
    else if (role === 'production') setActiveTab('production_runs');
    else if (role === 'auditor') setActiveTab('reports_sales');
    else if (role === 'owner') setActiveTab('owner_dashboard');
  }, [role]);

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading application session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app-layout">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-container">
        <Dashboard activeTab={activeTab} />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
