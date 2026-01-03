
import React, { useState, useEffect } from 'react';
import { User } from './types';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import Housekeeping from './pages/Housekeeping';
import Inventory from './pages/Inventory';
import CRM from './pages/CRM';
import Finance from './pages/Finance';
import AIWorkflows from './pages/AIWorkflows';
import GuestFeedback from './pages/GuestFeedback';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('lmnts_user');
    return stored ? JSON.parse(stored) : null;
  });
  
  // Disable dark mode for now as requested. 
  // We force light mode and remove the toggle functionality.
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    // Always ensure light mode is active
    document.documentElement.classList.remove('dark');
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('lmnts_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lmnts_user');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <Overview role={user.role} />;
      case 'Rooms': return <Rooms />;
      case 'Reservations': return <Reservations />;
      case 'Housekeeping': return <Housekeeping />;
      case 'Inventory': return <Inventory />;
      case 'CRM': return <CRM />;
      case 'Finance': return <Finance />;
      case 'AI Workflows': return <AIWorkflows />;
      case 'Guest Feedback': return <GuestFeedback user={user} />;
      default: return <Overview role={user.role} />;
    }
  };

  return (
    // Dashboard background set to white as requested
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-200">
      <DashboardLayout
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      >
        {renderContent()}
      </DashboardLayout>
    </div>
  );
};

export default App;
