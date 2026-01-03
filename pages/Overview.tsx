
import React from 'react';
import { UserRole } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  BedDouble, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { SECONDARY_COLOR } from '../constants';

const data = [
  { name: 'Mon', bookings: 4, revenue: 2400 },
  { name: 'Tue', bookings: 7, revenue: 1398 },
  { name: 'Wed', bookings: 5, revenue: 9800 },
  { name: 'Thu', bookings: 9, revenue: 3908 },
  { name: 'Fri', bookings: 12, revenue: 4800 },
  { name: 'Sat', bookings: 15, revenue: 3800 },
  { name: 'Sun', bookings: 10, revenue: 4300 },
];

const StatCard: React.FC<{ title: string; value: string; icon: any; trend: string; isPositive: boolean }> = ({ title, value, icon: Icon, trend, isPositive }) => (
  <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-[#5B8FB1]/10 text-[#5B8FB1] rounded-lg">
        <Icon size={22} />
      </div>
      <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend}
        {isPositive ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
      </div>
    </div>
    <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{title}</h3>
    <p className="text-xl sm:text-2xl font-bold mt-1 text-slate-950">{value}</p>
  </div>
);

const Overview: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight">Welcome back, {role === UserRole.ADMIN ? 'Administrator' : 'Staff Member'}</h2>
        <p className="text-slate-500 font-medium text-sm sm:text-base">Here's what's happening at Grand Port today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total Bookings" value="124" icon={TrendingUp} trend="+12%" isPositive={true} />
        <StatCard title="Guest Check-ins" value="48" icon={Users} trend="+5%" isPositive={true} />
        <StatCard title="Room Occupancy" value="84%" icon={BedDouble} trend="-2%" isPositive={false} />
        <StatCard title="Total Revenue" value="$24,500" icon={DollarSign} trend="+18%" isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold mb-6 text-slate-950">Revenue Performance</h3>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SECONDARY_COLOR} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke={SECONDARY_COLOR} strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold mb-6 text-slate-950">Booking Trends</h3>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="bookings" fill={SECONDARY_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
