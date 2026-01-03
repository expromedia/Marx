
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, User as UserIcon, Lock, RefreshCcw } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
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
      setError('Invalid verification answer. Please try again.');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#5B8FB1] rounded-2xl text-white font-bold text-[28px] shadow-xl shadow-[#5B8FB1]/20 mb-3">L</div>
          <h1 className="text-[29px] font-bold text-slate-900 tracking-tight leading-tight">Grand Port Hotel & Suites</h1>
          <p className="text-slate-500 mt-1 font-medium text-[15px]">Hotel Portal Management</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 overflow-y-auto max-h-[85vh]">
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button 
              onClick={() => setRole(UserRole.ADMIN)}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-[13px] font-semibold transition-all ${role === UserRole.ADMIN ? 'bg-white text-[#5B8FB1] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <ShieldCheck size={16} className="mr-2" />
              Administrator
            </button>
            <button 
              onClick={() => setRole(UserRole.STAFF)}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-[13px] font-semibold transition-all ${role === UserRole.STAFF ? 'bg-white text-[#5B8FB1] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <UserIcon size={16} className="mr-2" />
              Staff Member
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input 
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] focus:border-transparent transition-all outline-none text-slate-950 font-medium placeholder:text-slate-400 text-[13px]"
                  placeholder="Username / Email"
                  required
                />
                <UserIcon size={16} className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] focus:border-transparent transition-all outline-none text-slate-950 font-medium placeholder:text-slate-400 text-[13px]"
                  placeholder="Password"
                  required
                />
                <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  <div className="w-[70%] bg-slate-50 text-slate-800 font-mono text-[10px] font-bold flex items-center justify-center rounded-xl py-3 border border-slate-200 select-none">
                    {captchaQuestion} =
                  </div>
                  <input 
                    type="number" 
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-[30%] px-2 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5B8FB1] outline-none text-center font-bold text-slate-950 text-[13px]"
                    placeholder="Result"
                    required
                  />
                </div>
                <button 
                  type="button" 
                  onClick={generateCaptcha}
                  className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors shrink-0"
                  title="Refresh Question"
                >
                  <RefreshCcw size={18} />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-[12px] rounded-lg font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={!isCaptchaCorrect}
              className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] text-[14px] ${
                isCaptchaCorrect 
                ? 'bg-[#5B8FB1] hover:bg-[#4a7a99] text-white shadow-[#5B8FB1]/10 cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              Access Dashboard
            </button>
          </form>
        </div>
        <p className="text-center text-slate-400 text-[11px] mt-6 font-medium">© 2024 Grand Port Hotel & Suites. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
