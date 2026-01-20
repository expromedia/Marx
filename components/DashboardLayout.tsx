
import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  Bed, 
  CalendarCheck, 
  Sparkles, 
  ClipboardCheck, 
  Package, 
  Users, 
  BarChart3, 
  LogOut, 
  Menu,
  X,
  MessageSquareQuote,
  ShieldCheck,
  User as UserIcon,
  Settings,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarItemProps {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  isSidebarOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, isActive, onClick, isSidebarOpen }) => (
  <button
    onClick={onClick}
    title={!isSidebarOpen ? label : ''}
    className={`w-full flex items-center rounded-xl transition-all duration-200 ${
      isSidebarOpen 
        ? 'px-4 py-3 space-x-3 justify-start' 
        : 'p-3 justify-center'
    } ${
      isActive 
        ? 'bg-[#5B8FB1] text-white shadow-lg shadow-[#5B8FB1]/20' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
    }`}
  >
    <Icon size={20} className="shrink-0" />
    {isSidebarOpen && <span className="font-semibold text-sm truncate">{label}</span>}
  </button>
);

interface DashboardLayoutProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  children,
  theme,
  toggleTheme
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [activeTab]);

  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.STAFF] },
    { label: 'Reservations', icon: CalendarCheck, roles: [UserRole.ADMIN, UserRole.STAFF] },
    { label: 'Rooms', icon: Bed, roles: [UserRole.ADMIN] },
    { label: 'Housekeeping', icon: ClipboardCheck, roles: [UserRole.ADMIN, UserRole.STAFF] },
    { label: 'Inventory', icon: Package, roles: [UserRole.ADMIN] },
    { label: 'CRM', icon: Users, roles: [UserRole.ADMIN] },
    { label: 'Finance', icon: BarChart3, roles: [UserRole.ADMIN] },
    { label: 'Guest Feedback', icon: MessageSquareQuote, roles: [UserRole.ADMIN, UserRole.STAFF] },
    { label: 'AI Workflows', icon: Sparkles, roles: [UserRole.ADMIN, UserRole.STAFF] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  const SidebarContent = ({ isOpen, isMobile = false }: { isOpen: boolean; isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'flex-col space-y-4 justify-center'}`}>
        <div className="flex items-center overflow-hidden">
          <div className="w-9 h-9 bg-[#5B8FB1] rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-[#5B8FB1]/20">M</div>
          {isOpen && <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white ml-3 truncate">Marx</span>}
        </div>
        {!isMobile && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {filteredMenuItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={activeTab === item.label}
            onClick={() => setActiveTab(item.label)}
            isSidebarOpen={isOpen}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onLogout}
          className={`w-full flex items-center rounded-xl px-4 py-3 space-x-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all font-semibold text-sm ${!isOpen && 'justify-center px-0'}`}
        >
          <LogOut size={20} className="shrink-0" />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform lg:hidden transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent isOpen={true} isMobile={true} />
        <button 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="absolute top-6 right-6 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 lg:hidden"
        >
          <X size={20} />
        </button>
      </aside>

      <aside className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <SidebarContent isOpen={isSidebarOpen} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 sm:h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40 transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">{activeTab}</h2>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#5B8FB1] rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[#5B8FB1]/10">
                  {user.displayName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden sm:block text-left mr-2">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user.displayName}</p>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{user.role}</p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                  <div className="px-4 py-3 mb-2 border-b border-slate-100 dark:border-slate-800 sm:hidden">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.displayName}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{user.role}</p>
                  </div>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                    <UserIcon size={18} />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                    <Settings size={18} />
                    <span>Account Settings</span>
                  </button>
                  {user.role === UserRole.ADMIN && (
                    <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                      <ShieldCheck size={18} />
                      <span>Security Portal</span>
                    </button>
                  )}
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5 md:p-6 lg:p-8 custom-scrollbar transition-colors duration-300">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
