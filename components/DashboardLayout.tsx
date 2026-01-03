
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
  ChevronDown
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
    className={`w-full flex items-center rounded-lg transition-all duration-200 ${
      isSidebarOpen 
        ? 'px-4 py-3 space-x-3 justify-start' 
        : 'p-3 justify-center'
    } ${
      isActive 
        ? 'bg-sky-500 text-white shadow-md shadow-sky-200' 
        : 'text-slate-700 hover:bg-sky-50'
    }`}
  >
    <Icon size={20} className="shrink-0" />
    {isSidebarOpen && <span className="font-medium text-sm truncate">{label}</span>}
  </button>
);

interface DashboardLayoutProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  children
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

  // Close mobile sidebar on navigation
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

  const SidebarContent = ({ isOpen }: { isOpen: boolean }) => (
    <>
      <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'flex-col space-y-4 justify-center'}`}>
        <div className="flex items-center overflow-hidden">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">L</div>
          {isOpen && <span className="text-xl font-bold tracking-tight text-slate-950 ml-2 truncate">LMNTS</span>}
        </div>
        {/* Only show close button in sidebar on desktop toggle or mobile view */}
        <button 
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsMobileSidebarOpen(false);
            } else {
              setIsSidebarOpen(!isSidebarOpen);
            }
          }} 
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <X size={20} className={window.innerWidth < 1024 ? 'block' : isOpen ? 'block' : 'hidden'} />
          {!isOpen && window.innerWidth >= 1024 && <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
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
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex-col z-50 shadow-sm shrink-0`}>
        <SidebarContent isOpen={isSidebarOpen} />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent isOpen={true} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 z-40 shadow-sm">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-950 truncate max-w-[150px] sm:max-w-none">
              {activeTab}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* User Profile Section with Dropdown */}
            <div className="relative" ref={profileRef}>
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-6 border-l border-slate-200 cursor-pointer group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-950 group-hover:text-sky-600 transition-colors">{user.displayName}</p>
                  <p className="text-[10px] text-sky-600 font-bold uppercase tracking-widest">{user.role}</p>
                </div>
                <div className="relative shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 flex items-center justify-center border-2 border-sky-100 transition-all group-hover:border-sky-500 overflow-hidden">
                    {user.role === UserRole.ADMIN ? (
                      <ShieldCheck size={20} className="text-sky-600" />
                    ) : (
                      <UserIcon size={20} className="text-sky-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="px-4 py-3 border-b border-slate-50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="text-[13px] font-bold text-slate-900 truncate">{user.username}</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">
                      <UserIcon size={18} />
                      <span className="font-medium">My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">
                      <Settings size={18} />
                      <span className="font-medium">System Settings</span>
                    </button>
                  </div>
                  <div className="pt-1 mt-1 border-t border-slate-50">
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} />
                      <span className="font-bold">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
