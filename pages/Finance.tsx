
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { DollarSign, Download, TrendingUp, Calendar } from 'lucide-react';
import { SECONDARY_COLOR } from '../constants';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const categoryData = [
  { name: 'Room Service', value: 400 },
  { name: 'Accommodations', value: 1200 },
  { name: 'Events', value: 300 },
  { name: 'Spa & Wellness', value: 200 },
];

const COLORS = ['#5B8FB1', '#66A9D4', '#7FB3D5', '#A9CCE3'];

// Added FinanceProps interface to handle theme
interface FinanceProps {
  theme: 'light' | 'dark';
}

const Finance: React.FC<FinanceProps> = ({ theme }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Finance & Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400">Comprehensive financial oversight and reporting.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Calendar size={16} className="text-[#5B8FB1]" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#5B8FB1] text-white rounded-xl text-sm font-bold hover:bg-[#4a7a99] transition-all">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Revenue Flow</h3>
            <div className="flex items-center text-emerald-500 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
              <TrendingUp size={16} className="mr-1.5" />
              +15.2%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke={SECONDARY_COLOR} strokeWidth={4} fillOpacity={0.1} fill={SECONDARY_COLOR} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 text-center">Revenue by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                {/* Fixed the 'theme' reference by accepting it as a prop */}
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Daily Rate', value: '$342.00', color: '#5B8FB1' },
          { label: 'RevPAR', value: '$287.50', color: '#66A9D4' },
          { label: 'Net Profit', value: '$42,300', color: 'emerald' },
          { label: 'Operating Costs', value: '$18,900', color: 'rose' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;
