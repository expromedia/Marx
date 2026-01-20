
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, User as UserIcon, Lock, RefreshCcw, Sun, Moon, CheckCircle2, Bed, CalendarCheck, BarChart3 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, theme, toggleTheme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState<number | null>(null);
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const isAddition = Math.random() > 0.5;
    const num1 = Math.floor(Math.random() * 15) + 5;
    const num2 = Math.floor(Math.random() * 10) + 1;
    
    if (isAddition) {
      setCaptchaQuestion(`${num1} + ${num2}`);
      setCaptchaAnswer(num1 + num2);
    } else {
      const n1 = Math.max(num1, num2);
      const n2 = Math.min(num1, num2);
      setCaptchaQuestion(`${n1} - ${n2}`);
      setCaptchaAnswer(n1 - n2);
    }
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (parseInt(captchaInput) !== captchaAnswer) {
      setError('Invalid verification answer.');
      generateCaptcha();
      return;
    }

    if (role === UserRole.ADMIN) {
      if (username === 'info@expromedia.com.ng' && password === 'admin1356@#') {
        onLogin({ username, role, displayName: 'John Smith' });
      } else {
        setError('Invalid admin credentials.');
      }
    } else {
      if (username === 'staff@expromedia.com.ng' && password === 'staff1356@#') {
        onLogin({ username, role, displayName: 'Sarah Jenkins' });
      } else {
        setError('Invalid staff credentials.');
      }
    }
  };

  const isCaptchaCorrect = parseInt(captchaInput) === captchaAnswer;
  const displayYear = 2026;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Left Side: Visual Content & Branding */}
      <div className="hidden md:flex w-1/2 relative bg-slate-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Luxury Resort" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-slate-950/80"></div>
        
        {/* Branding - Top Left */}
        <div className="absolute top-10 left-10 flex items-center space-x-3 z-20">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-[#5B8FB1] rounded-xl text-white font-bold text-xl shadow-lg shadow-[#5B8FB1]/20">M</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Marx Portal</h1>
        </div>

        {/* Theme Toggle - Top Right */}
        <div className="absolute top-10 right-10 flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 z-20">
          <span className={`text-[7px] font-black uppercase tracking-[0.1em] transition-colors ${theme === 'light' ? 'text-[#5B8FB1]' : 'text-slate-400'}`}>Light</span>
          <button 
            onClick={toggleTheme}
            className="relative w-9 h-5 bg-slate-700 dark:bg-slate-600 rounded-full transition-colors focus:outline-none p-1 flex items-center"
          >
            <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
          <span className={`text-[7px] font-black uppercase tracking-[0.1em] transition-colors ${theme === 'dark' ? 'text-[#66A9D4]' : 'text-slate-400'}`}>Dark</span>
        </div>
        
        <div className="relative z-10 w-full flex flex-col justify-center p-12 lg:p-16 text-white h-full">
          <div className="max-w-xl">
            <h3 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Hospitality Excellence, Reimagined.
            </h3>
            <p className="text-base lg:text-xl text-slate-300 font-medium mb-12 leading-relaxed">
              Marx is an integrated ecosystem designed to synchronize every touchpoint of the guest journey with precision and care.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <CalendarCheck className="text-[#5B8FB1]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Smart Bookings</h4>
                  <p className="text-xs text-slate-400">Dynamic reservation and room allocation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <Bed className="text-[#5B8FB1]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Guest Ops</h4>
                  <p className="text-xs text-slate-400">Real-time room status and inventory.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <BarChart3 className="text-[#5B8FB1]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Revenue Intel</h4>
                  <p className="text-xs text-slate-400">Advanced forecasting and reporting.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <ShieldCheck className="text-[#5B8FB1]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Safe Access</h4>
                  <p className="text-xs text-slate-400">Secure multi-level portal security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 left-10 w-24 h-24 border-l-2 border-t-2 border-white/20 rounded-tl-2xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-r-2 border-b-2 border-white/20 rounded-br-2xl pointer-events-none"></div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 lg:p-10 h-screen overflow-hidden">
        <div className="w-full max-w-sm flex flex-col h-full max-h-[750px] justify-center">
          
          {/* Mobile Only Branding */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-[#5B8FB1] rounded-lg text-white font-bold text-lg">M</div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Marx Portal</h1>
            </div>
            <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Sign In</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Access your management workspace.</p>
          </div>

          <div className="bg-white dark:bg-slate-900/50 p-1.5 border border-slate-100 dark:border-slate-800 rounded-xl mb-6">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setRole(UserRole.ADMIN)}
                className={`flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all ${role === UserRole.ADMIN ? 'bg-white dark:bg-slate-700 text-[#5B8FB1] dark:text-[#66A9D4] shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <ShieldCheck size={14} className="mr-2" />
                Admin
              </button>
              <button 
                onClick={() => setRole(UserRole.STAFF)}
                className={`flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all ${role === UserRole.STAFF ? 'bg-white dark:bg-slate-700 text-[#5B8FB1] dark:text-[#66A9D4] shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <UserIcon size={14} className="mr-2" />
                Staff
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Identity</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] focus:border-transparent transition-all outline-none text-slate-950 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                  placeholder="name@marxhotel.com"
                  required
                />
                <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] focus:border-transparent transition-all outline-none text-slate-950 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                  placeholder="••••••••"
                  required
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Anti-Bot Verification</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-1.5">
                  <div className="w-[60%] bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-mono text-[11px] font-bold flex items-center justify-center rounded-xl py-3.5 border border-slate-200 dark:border-slate-800 select-none">
                    {captchaQuestion} =
                  </div>
                  <input 
                    type="number" 
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-[40%] px-2 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] outline-none text-center font-bold text-slate-950 dark:text-white text-sm"
                    placeholder="?"
                    required
                  />
                </div>
                <button 
                  type="button" 
                  onClick={generateCaptcha}
                  className="p-3.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0 border border-slate-200 dark:border-slate-800"
                  title="Refresh"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[11px] rounded-xl font-bold flex items-center">
                <CheckCircle2 size={14} className="mr-2 shrink-0" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={!isCaptchaCorrect}
              className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] text-sm mt-2 ${
                isCaptchaCorrect 
                ? 'bg-[#5B8FB1] hover:bg-[#4a7a99] text-white shadow-[#5B8FB1]/20 cursor-pointer' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
              }`}
            >
              Enter Dashboard
            </button>
          </form>

          <p className="text-center text-slate-400 dark:text-slate-500 text-[9px] mt-10 font-bold uppercase tracking-widest whitespace-nowrap">
            © {displayYear} Marx Hotel & Suites. All Rights Reserved.
            <a 
              href="https://www.expromedia.com.ng" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 text-[#5B8FB1] hover:underline"
            >
              Credits
            </a>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
