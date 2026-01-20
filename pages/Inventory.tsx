
import React from 'react';
import { MOCK_INVENTORY } from '../constants';
import { Package, AlertCircle, TrendingDown, ArrowUpRight } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Supply Inventory</h2>
          <p className="text-slate-500 dark:text-slate-400">Track and manage hotel equipment and supplies.</p>
        </div>
        <button className="bg-[#5B8FB1] hover:bg-[#4a7a99] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#5B8FB1]/10">
          + Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Total Stock</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">2,482</p>
          <div className="flex items-center text-emerald-500 text-xs mt-2 font-bold">
            <ArrowUpRight size={14} className="mr-1" />
            +4.5% vs last week
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30 shadow-sm transition-colors">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Low Stock Alerts</h3>
          <p className="text-3xl font-bold text-rose-500">12</p>
          <div className="flex items-center text-rose-400 text-xs mt-2 font-bold">
            <AlertCircle size={14} className="mr-1" />
            Requires attention
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Item Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">In Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_INVENTORY.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#5B8FB1] flex items-center justify-center mr-3">
                      <Package size={16} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{item.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="font-bold text-slate-900 dark:text-white mr-2">{item.quantity}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Units</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    item.quantity <= item.minThreshold ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {item.quantity <= item.minThreshold ? 'Low Stock' : 'Good'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#5B8FB1] hover:text-[#4a7a99] font-bold text-sm transition-colors">Order More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
