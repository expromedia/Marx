
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
    const stored = localStorage.getItem('marx_user');
    return stored ? JSON.parse(stored) : null;
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('marx_theme');
    return (storedTheme as 'light' | 'dark') || 'light';
  });

  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('marx_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('marx_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('marx_user');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <Overview role={user.role} />;
      case 'Rooms': return <Rooms />;
      case 'Reservations': return <Reservations />;
      case 'Housekeeping': return <Housekeeping />;
      case 'Inventory': return <Inventory />;
      case 'CRM': return <CRM />;
      // Added theme prop to Finance component
      case 'Finance': return <Finance theme={theme} />;
      case 'AI Workflows': return <AIWorkflows />;
      case 'Guest Feedback': return <GuestFeedback user={user} />;
      default: return <Overview role={user.role} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-200">
      <DashboardLayout
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      >
        {renderContent()}
      </DashboardLayout>
    </div>
  );
};

export default App;
