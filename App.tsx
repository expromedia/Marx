
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
import { Loader2 } from 'lucide-react';

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
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [tempUser, setTempUser] = useState<User | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('marx_theme', theme);
  }, [theme]);

  // Handle Login Sequence
  useEffect(() => {
    if (isLoggingIn) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (tempUser) {
                setUser(tempUser);
                localStorage.setItem('marx_user', JSON.stringify(tempUser));
                setIsLoggingIn(false);
                setLoadingProgress(0);
              }
            }, 600); // Slight pause at 100% for impact
            return 100;
          }
          // Varied increments for a more organic feel
          const step = Math.floor(Math.random() * 12) + 3;
          return prev + step;
        });
      }, 120);
      return () => clearInterval(interval);
    }
  }, [isLoggingIn, tempUser]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (userData: User) => {
    setTempUser(userData);
    setIsLoggingIn(true);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate a "graceful" logging off sequence with a slower transition
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('marx_user');
      setIsLoggingOut(false);
      setActiveTab('Overview');
    }, 2500); // Increased duration for a slower, smoother transition
  };

  // Loading Screen Component
  const LoadingOverlay = ({ progress, text }: { progress?: number; text: string }) => (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-700 animate-in fade-in zoom-in-95 text-center px-6">
      <div className="relative mb-14">
        <div className="w-20 h-20 bg-[#5B8FB1] rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-[#5B8FB1]/40 animate-pulse">
          M
        </div>
        <div className="absolute -inset-4 border border-[#5B8FB1]/20 rounded-full animate-[spin_10s_linear_infinite]" />
      </div>
      
      <div className="w-full max-w-xs space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <p className="text-[10px] font-black text-[#5B8FB1] uppercase tracking-[0.4em]">Marx OS v2.0</p>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{text}</p>
          {progress !== undefined && (
            <span className="text-5xl font-black text-slate-900 dark:text-white tabular-nums mt-2">{Math.min(progress, 100)}%</span>
          )}
        </div>
        
        {progress !== undefined ? (
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-[#5B8FB1] to-[#66A9D4] transition-all duration-500 ease-out shadow-[0_0_15px_rgba(91,143,177,0.5)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        ) : (
          <div className="flex justify-center pt-2">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 bg-[#5B8FB1] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2.5 h-2.5 bg-[#5B8FB1] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2.5 h-2.5 bg-[#5B8FB1] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoggingIn) {
    return <LoadingOverlay progress={loadingProgress} text="Synchronizing Workspace" />;
  }

  if (isLoggingOut) {
    return <LoadingOverlay text="Logging Off" />;
  }

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
